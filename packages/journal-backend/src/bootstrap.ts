import { Application } from "./app";
import { BaseController } from "./base";
import {
  HealthCheckController,
  HealthCheckService,
  IJournalEntry,
  JournalEntryController,
  JournalEntryRepository,
  JournalEntryService,
} from "./features";
import { ConfigService, DatabaseService, LoggerService } from "./shared";

export function bootstrap(
  databaseService: DatabaseService,
  databaseName = "APP_DB"
) {
  let controllers: BaseController[] = [];
  let configService = ConfigService.GetSingleton();
  let loggerService = LoggerService.GetSingleton(configService);

  // Health Check
  const healhCheckService = new HealthCheckService(loggerService);
  controllers.push(new HealthCheckController(healhCheckService, loggerService));

  // Journal Entries
  const journalEntriesResult = databaseService.getCollection<IJournalEntry>(
    databaseName,
    "journal-entries"
  );
  if (journalEntriesResult.isSuccess()) {
    const journalEntryRepository = new JournalEntryRepository(
      journalEntriesResult.value
    );
    const journalEntryService = new JournalEntryService(
      journalEntryRepository,
      loggerService
    );
    controllers.push(
      new JournalEntryController(journalEntryService, loggerService)
    );
  }

  const app = new Application(configService, loggerService, controllers);

  return app;
}
