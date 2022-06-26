import {
  JournalEntry,
  JournalEntryCreateError,
  JournalEntryRepository,
  JournalEntryValidationError,
} from ".";
import { BaseService } from "../../base";
import { Either, failure, LoggerService, success } from "../../shared";

export class JournalEntryService extends BaseService {
  constructor(
    private journalEntryRepository: JournalEntryRepository,
    loggerService: LoggerService
  ) {
    super(loggerService);
  }

  async createEntry(
    reqBody: any
  ): Promise<
    Either<undefined, JournalEntryValidationError | JournalEntryCreateError>
  > {
    const journalEntryOrErrors = JournalEntry.InstanceOrError(reqBody);
    if (journalEntryOrErrors.isFailure()) {
      return failure(
        JournalEntryValidationError.Factory(journalEntryOrErrors.value)
      );
    }

    let entryCreateResult = await this.journalEntryRepository.insertOne(
      journalEntryOrErrors.value.toJSON()
    );
    if (!entryCreateResult.acknowledged) {
      return failure(JournalEntryCreateError.Factory());
    }

    return success(undefined);
  }
}
