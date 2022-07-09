import { BaseService } from "../../base";
import { LoggerService } from "../../shared";

export class HealthCheckService extends BaseService {
  constructor(loggerService: LoggerService) {
    super(loggerService);
  }

  getMessage() {
    return { message: "Health Check is Working!" };
  }
}
