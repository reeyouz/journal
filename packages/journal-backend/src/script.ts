import { ConfigService } from "./shared";

if (!ConfigService.GetSingleton().isProd) {
  const { MONGO_DB_URI } = process.env;
  if (MONGO_DB_URI === undefined) {
    require("dotenv").config();
  }
}
