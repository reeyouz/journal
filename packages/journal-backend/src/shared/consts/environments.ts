export const DEV = "development";
export const PROD = "production";
export const TEST = "testing";

export type Environment = typeof DEV | typeof TEST | typeof PROD;
