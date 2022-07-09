import { NextFunction, Request, Response } from "express";
import { HealthCheckService } from ".";
import { BaseController } from "../../base";
import { LoggerService } from "../../shared";

export class HealthCheckController extends BaseController {
  private healthCheckService: HealthCheckService;
  public get path() {
    return "/";
  }

  constructor(
    healtCheckService: HealthCheckService,
    loggerService: LoggerService
  ) {
    super(loggerService);
    this.healthCheckService = healtCheckService;
    this.router.get(this.path, this.get.bind(this));
  }

  get(_req: Request, _res: Response, _next: NextFunction) {
    return this.http.ok(this.healthCheckService.getMessage());
  }
}
