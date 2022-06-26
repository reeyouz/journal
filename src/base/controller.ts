import { NextFunction, Request, Response, Router } from "express";
import { Logger } from "winston";
import { LoggerService, Http } from "../shared";

export abstract class BaseController {
  protected http: Http;
  protected readonly log: Logger;
  readonly router = Router();
  abstract path: string;

  constructor(loggerService: LoggerService) {
    this.log = loggerService.logger;
    this.router.use(this.httpHelper.bind(this));
  }

  private httpHelper(_req: Request, res: Response, next: NextFunction) {
    this.http = new Http(res);
    next();
  }
}
