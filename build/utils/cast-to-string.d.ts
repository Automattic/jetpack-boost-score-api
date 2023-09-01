/**
 * Given an unknown value from an external source (e.g.: API response), parse
 * it as a string. Returns defaultValue if the value does not seem to be a valid
 * string.
 *
 * @template DefaultType
 * @param {*}           value        - External value to process as a string
 * @param {DefaultType} defaultValue - Default value to return if not a string
 * @returns {string | DefaultType} value as a string, of defaultValue.
 */
export declare function castToString<DefaultType = undefined>(value: unknown, defaultValue?: DefaultType | undefined): string | DefaultType | undefined;
