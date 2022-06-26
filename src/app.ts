import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { Logger } from "winston";
import { ConfigService, LoggerService } from "./shared";
import { BaseController, BaseError } from "./base";

export class Application {
  private _app = express();
  private logger: Logger;

  get app() {
    return this.configService.isTest ? this._app : null;
  }

  constructor(
    private configService: ConfigService,
    loggerService: LoggerService,
    controllers: BaseController[] = []
  ) {
    this.logger = loggerService.logger;
    this.setupMiddlewares();
    this.setupRoutes(controllers);
    this._app.use(this.errorHandler.bind(this));
  }

  setupMiddlewares() {
    this._app.use(helmet());
    if (!this.configService.isProd) {
      this._app.use(cors());
    }
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(this.requestLogger.bind(this));
  }

  requestLogger(req: Request, _res: Response, next: NextFunction) {
    this.logger.info({
      url: req.url,
      method: req.method,
      ...(req.params !== undefined && { params: req.params }),
    });
    next();
  }

  setupRoutes(controllers: BaseController[]) {
    for (let controller of controllers) {
      this._app.use("/", controller.router);
    }
  }

  errorHandler(
    err: BaseError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.logger.error(err);
    const { status_code, title, detail, errors } = err;
    res
      .status(status_code)
      .send({ title, detail, ...(errors !== undefined && { errors }) });
  }

  listen(port?: number) {
    let PORT = port ?? this.configService.APP_PORT;
    this._app.listen(PORT, () => {
      this.logger.info(`Server listening on PORT ${PORT}`);
    });
  }
}
