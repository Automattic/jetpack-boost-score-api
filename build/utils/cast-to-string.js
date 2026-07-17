"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castToString = castToString;
/**
 * Given an unknown value from an external source (e.g.: API response), parse
 * it as a string. Returns defaultValue if the value does not seem to be a valid
 * string.
 *
 * @template DefaultType
 * @param {*}           value        - External value to process as a string
 * @param {DefaultType} defaultValue - Default value to return if not a string
 * @return {string | DefaultType} value as a string, of defaultValue.
 */
function castToString(value, defaultValue = undefined) {
    if (typeof value === 'string') {
        return value;
    }
    if (!value) {
        return defaultValue;
    }
    if (value.toString instanceof Function) {
        return value.toString();
    }
    return defaultValue;
}
//# sourceMappingURL=cast-to-string.js.map