import { DEV, TEST, PROD, Environment } from "..";

export class ConfigService {
  private _NODE_ENV: Environment;
  private _APP_PORT: number;
  private _ALLOWED_ORIGINS: string | string[] | undefined;
  private _isProd: boolean;
  private _isTest: boolean;

  private static instance: ConfigService | undefined;

  get NODE_ENV() {
    return this._NODE_ENV;
  }

  get APP_PORT() {
    return this._APP_PORT;
  }

  get MONGO_URI() {
    return process.env["MONGO_DB_URI"]!;
  }

  get JWT_TOKEN() {
    return process.env["JWT_TOKEN"]!;
  }

  get ALLOWED_ORIGINS() {
    return this._ALLOWED_ORIGINS;
  }

  get isProd() {
    return this._isProd;
  }

  get isTest() {
    return this._isTest;
  }

  private constructor() {
    this._NODE_ENV = this.getEnvironment();
    this._APP_PORT = this.getAppPort();
    this._ALLOWED_ORIGINS = this.getAllowedOrigins();
    this._isProd = this._NODE_ENV === PROD;
    this._isTest = this._NODE_ENV === TEST;
  }

  static GetSingleton() {
    if (ConfigService.instance === undefined) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private getEnvironment() {
    let { NODE_ENV } = process.env;
    NODE_ENV = NODE_ENV
      ? [DEV, TEST, PROD].includes(NODE_ENV)
        ? NODE_ENV
        : DEV
      : DEV;
    return NODE_ENV as Environment;
  }

  private getAppPort() {
    let { PORT } = process.env;
    if (PORT === undefined || /^{0-9}{3,4}$/.test(PORT)) {
      PORT = "3000";
    }
    return Number(PORT);
  }

  private getAllowedOrigins(): string | string[] | undefined {
    let ALLOWED_ORIGINS = process.env["ALLOWED_ORIGINS"];
    // console.log(ALLOWED_ORIGINS);
    if (typeof ALLOWED_ORIGINS === "string") {
      try {
        ALLOWED_ORIGINS = JSON.parse(ALLOWED_ORIGINS);
      } catch (error) {}
    }
    // console.log(ALLOWED_ORIGINS);
    return ALLOWED_ORIGINS;
  }
}
