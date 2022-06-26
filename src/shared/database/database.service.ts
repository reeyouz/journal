import { Collection, MongoClient } from "mongodb";
import {
  DatabaseDisconnectionError,
  DatabaseNotConnectedError,
  DatabaseConnectionError,
} from ".";
import { ConfigService, Either, failure, LoggerService, success } from "..";
import { BaseService } from "../../base";

export class DatabaseService extends BaseService {
  private _client: MongoClient | undefined = undefined;
  isConnected = false;

  get client() {
    return this._client;
  }

  constructor(
    loggerService: LoggerService,
    private configService: ConfigService
  ) {
    super(loggerService);
  }

  async connect(): Promise<Either<undefined, DatabaseConnectionError>> {
    this.log.info(`Connecting at ${this.configService.MONGO_URI}`);
    if (this.isConnected === false) {
      if (this._client === undefined) {
        this._client = new MongoClient(this.configService.MONGO_URI);
      }
      return this._client
        .connect()
        .then(() => {
          this.isConnected = true;
          return success<undefined, DatabaseConnectionError>(undefined);
        })
        .catch((err) => {
          const error = DatabaseConnectionError.Factory(
            this.configService.MONGO_URI
          );
          error.message = err.message;
          this.isConnected = false;
          return failure(error);
        });
    }
    this.isConnected = true;
    return success(undefined);
  }

  async disconnect(): Promise<Either<undefined, DatabaseDisconnectionError>> {
    this.log.warn("Disconnecting from database");
    if (this.isConnected === true && this._client !== undefined) {
      return this._client
        .close()
        .then(() => {
          this.isConnected = false;
          return success<undefined, DatabaseDisconnectionError>(undefined);
        })
        .catch((err) => {
          const error = DatabaseDisconnectionError.Factory();
          error.message = err.message;
          this.isConnected = true;
          return failure(error);
        });
    }
    this.isConnected = false;
    return success(undefined);
  }

  getCollection<T>(
    dbName: string,
    collectionName: string
  ): Either<Collection<T>, DatabaseNotConnectedError> {
    if (this.isConnected === false) {
      return failure(DatabaseNotConnectedError.Factory());
    }
    const collection = this._client!.db(dbName).collection<T>(collectionName);
    return success(collection);
  }
}
