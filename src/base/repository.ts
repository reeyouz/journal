import {
  Collection,
  Filter,
  OptionalUnlessRequiredId,
  WithoutId,
} from "mongodb";

export abstract class BaseRepository<T> {
  protected readonly collection: Collection<T>;

  constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  insertOne(data: OptionalUnlessRequiredId<T>) {
    return this.collection.insertOne(data);
  }

  find(filter: Filter<T>): Promise<WithoutId<T>[]> {
    return this.collection.find(filter, { projection: { _id: 0 } }).toArray();
  }
}
