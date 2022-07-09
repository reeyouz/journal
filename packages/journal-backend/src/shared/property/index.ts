import { Either, failure } from "..";

export class Property {
  static IsEmptyRaw(data?: any) {
    return data === undefined || data === null;
  }

  static IsEmpty<Success>(
    property: string,
    data?: any
  ): false | Either<Success, PropertyError> {
    return Property.IsEmptyRaw(data)
      ? failure({ property, message: Property.CannotBeEmpty(property) })
      : false;
  }

  static IsStringRaw(data: any): data is string {
    return typeof data === "string";
  }

  static IsNotAString<Success>(
    property: string,
    data: any
  ): false | Either<Success, PropertyError> {
    return Property.IsStringRaw(data)
      ? false
      : failure({ property, message: Property.IsAString(property) });
  }

  static LengthGreaterThanRaw(data: string, max_length: number) {
    return data.length > max_length;
  }

  static LengthGreaterThan<Success>(
    property: string,
    max_length: number,
    data: string
  ): false | Either<Success, PropertyError> {
    return Property.LengthGreaterThanRaw(data, max_length)
      ? failure({ property, message: Property.MaxLength(property, max_length) })
      : false;
  }

  static IsNotADate<Success>(
    property: string,
    data: any
  ): false | Either<Success, PropertyError> {
    try {
      new Date(data);
      return false;
    } catch (error) {
      return failure({ property, message: Property.IsInvalidDate(property) });
    }
  }

  static IsAString(property: string) {
    return `'${property}' is a string!`;
  }

  static IsInvalidDate(property: string) {
    return `'${property}' is not a valid date!`;
  }

  static CannotBeEmpty(property: string) {
    return `'${property}' cannot be empty!`;
  }

  static MaxLength(property: string, numberOfCharacters: number) {
    return `'${property}' cannot exceed ${numberOfCharacters} characters!`;
  }
}

export type ErrorMessage = string;
export interface PropertyError {
  property: string;
  message: ErrorMessage;
  error?: Error;
}
