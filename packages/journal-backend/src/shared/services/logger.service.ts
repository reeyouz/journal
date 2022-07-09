import { createLogger, format, Logger, transports } from "winston";
import { ConfigService } from "./config.service";

export class LoggerService {
  logger: Logger;
  private static instance: LoggerService | undefined;

  private constructor(private configService: ConfigService) {
    this.logger = createLogger({
      level: "info",
      transports: [
        new transports.File({
          dirname: "logs",
          filename: "app-logs.log",
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    });

    if (!this.configService.isProd) {
      this.logger.level = "debug";
      this.logger.add(
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.json(),
            format.prettyPrint()
          ),
        })
      );
    }
  }

  static GetSingleton(configService: ConfigService) {
    if (LoggerService.instance === undefined) {
      LoggerService.instance = new LoggerService(configService);
    }
    return LoggerService.instance;
  }
}
