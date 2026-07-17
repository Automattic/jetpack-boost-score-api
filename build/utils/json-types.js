"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonObject = isJsonObject;
exports.isJsonArray = isJsonArray;
/**
 * Returns true if the given JSONValue is a JSONObject.
 *
 * @param {JSONValue} value - Value to check.
 * @return {boolean} True if the given value is a JSONObject.
 */
function isJsonObject(value) {
    return !!value && value instanceof Object && !(value instanceof Array);
}
/**
 * Returns true if the given JSONValue is a JSONArray.
 * Sure, you could use x instanceof Array but this is shorter and more consistent.
 *
 * @param {JSONValue} value - Value to check.
 * @return {boolean} True if the given value is a JSONArray.
 */
function isJsonArray(value) {
    return value instanceof Array;
}
//# sourceMappingURL=json-types.js.map