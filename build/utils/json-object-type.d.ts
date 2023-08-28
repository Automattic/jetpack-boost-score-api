import { z } from 'zod';
/**
 * Definition for JSON types:
 * - JSONValue can be any value compatible with JSON; an object (containing JSONValues), array, string, number, boolean, or null
 * - JSONObject is an object containing JSONValues
 * - JSONSchema is a zod schema that can be used to validate JSONValues
 */
declare const literalSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
type Literal = z.infer<typeof literalSchema>;
export type JSONValue = Literal | JSONObject | JSONValue[];
export type JSONObject = {
    [key: string]: JSONValue;
};
export {};
