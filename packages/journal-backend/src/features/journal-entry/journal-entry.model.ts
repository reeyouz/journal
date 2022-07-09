import { BaseModel } from "../../base";
import {
  Either,
  failure,
  Property,
  PropertyError,
  success,
} from "../../shared";

export interface IJournalEntry {
  _id: string;
  content: string;
  createdOn: Date;
}

export class JournalEntry extends BaseModel implements IJournalEntry {
  private _content: Content;
  private _createdOn: CreatedOn;

  public get content() {
    return this._content.data;
  }

  public get createdOn() {
    return this._createdOn.data;
  }

  private constructor() {
    super();
  }

  public toJSON(): IJournalEntry {
    return {
      _id: this._id,
      content: this.content,
      createdOn: this.createdOn,
    };
  }

  public static InstanceOrError(
    data?: any
  ): Either<JournalEntry, PropertyError[]> {
    let errors: PropertyError[] = [];
    let journalEntry = new JournalEntry();

    const contentOrError = Content.InstanceOrError(data.content);
    if (contentOrError.isFailure()) {
      errors.push(contentOrError.value);
    } else {
      journalEntry._content = contentOrError.value;
    }

    const createdOnOrError = CreatedOn.InstanceOrError(data.createdOn);
    if (createdOnOrError.isFailure()) {
      errors.push(createdOnOrError.value);
    } else {
      journalEntry._createdOn = createdOnOrError.value;
    }

    if (errors.length > 0) {
      return failure(errors);
    }

    return success(journalEntry);
  }
}

export class Content {
  private static readonly MIN_CHAR = 5;
  private static readonly MAX_CHAR = 200;

  data: string;

  private constructor(data: string) {
    this.data = data;
  }

  public static InstanceOrError(data?: any): Either<Content, PropertyError> {
    return (
      Property.IsEmpty(Content.name, data) ||
      Property.IsNotAString(Content.name, data) ||
      Property.LengthLesserThan(Content.name, Content.MIN_CHAR, data) ||
      Property.LengthGreaterThan(Content.name, Content.MAX_CHAR, data) ||
      success(new Content(data))
    );
  }
}

export class CreatedOn {
  data: Date;

  private constructor(data: Date) {
    this.data = data;
  }

  public static InstanceOrError(data?: any): Either<CreatedOn, PropertyError> {
    return Property.IsEmptyRaw(data)
      ? success(new CreatedOn(new Date()))
      : Property.IsNotADate(Content.name, data) || success(new CreatedOn(data));
  }
}
