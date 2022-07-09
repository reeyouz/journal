import { Collection } from "mongodb";
import { IJournalEntry } from ".";
import { BaseRepository } from "../../base";

export class JournalEntryRepository extends BaseRepository<IJournalEntry> {
  constructor(collection: Collection<IJournalEntry>) {
    super(collection);
  }
}
