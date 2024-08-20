/**
 * Generic type for handling JSON-like objects.
 *
 * Use this as a last resort if you can't reasonably describe the possible shapes an object can take.
 */
export type JSONObject = {
    [key: string]: JSONValue;
};
export type JSONArray = JSONValue[];
export type JSONValue = string | number | boolean | JSONObject | JSONArray | null | undefined;
/**
 * Returns true if the given JSONValue is a JSONObject.
 *
 * @param {JSONValue} value - Value to check.
 * @return {boolean} True if the given value is a JSONObject.
 */
export declare function isJsonObject(value: JSONValue): value is JSONObject;
/**
 * Returns true if the given JSONValue is a JSONArray.
 * Sure, you could use x instanceof Array but this is shorter and more consistent.
 *
 * @param {JSONValue} value - Value to check.
 * @return {boolean} True if the given value is a JSONArray.
 */
export declare function isJsonArray(value: JSONValue): value is JSONArray;
