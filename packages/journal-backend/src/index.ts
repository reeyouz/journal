import "./script";
import { bootstrap } from "./bootstrap";
import { ConfigService, DatabaseService, LoggerService } from "./shared";

(async () => {
  const configService = ConfigService.GetSingleton();
  const loggerService = LoggerService.GetSingleton(configService);
  const databaseService = new DatabaseService(loggerService, configService);
  const result = await databaseService.connect();
  if (result.isFailure()) {
    loggerService.logger.error("Could not connect to the database! Exiting...");
    process.exit(0);
  }
  const databaseName = "APP_DB";

  const app = bootstrap(databaseService, databaseName);

  app.listen();
})();
