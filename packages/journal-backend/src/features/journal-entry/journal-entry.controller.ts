import { NextFunction, Request, Response } from "express";
import { JournalEntryService } from ".";
import { BaseController } from "../../base";
import { LoggerService, UnexpectedError } from "../../shared";

export class JournalEntryController extends BaseController {
  private journalEntryService: JournalEntryService;

  public get path() {
    return "/journal-entries";
  }

  constructor(service: JournalEntryService, loggerService: LoggerService) {
    super(loggerService);
    this.journalEntryService = service;
    this.router.post(this.path, this.post.bind(this));
  }

  async post(req: Request, _res: Response, next: NextFunction) {
    try {
      let result = await this.journalEntryService.createEntry(req.body);
      if (result.isSuccess()) {
        return this.http.created();
      }
      return next(result.value);
    } catch (error) {
      next(UnexpectedError.Factory(error));
    }
  }

  async get(_req: Request, _res: Response, _next: NextFunction) {}
}
