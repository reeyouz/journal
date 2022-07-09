import { ConfigService } from "./shared";

if (!ConfigService.GetSingleton().isProd) {
  require("dotenv").config();
}
