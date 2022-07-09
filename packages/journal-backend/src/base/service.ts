import { Logger } from "winston";
import { LoggerService } from "../shared";

export abstract class BaseService {
  protected log: Logger;

  constructor(loggerService: LoggerService) {
    this.log = loggerService.logger;
  }
}
