import type { JSONValue } from './json-types';
/**
 * JavaScript offers no guarantee that caught objects in catch blocks are actually
 * Error objects. This method fixes that, for type safety. :)
 *
 * @param {*}               data           - Any thrown error data to interpret as an Error (or subclass)
 * @param {JSONValue|Error} defaultMessage - A default message to throw if no sensible error can be found.
 * @return {Error} the data guaranteed to be an Error or subclass thereof.
 */
export declare function standardizeError(data: JSONValue | Error, defaultMessage?: string): Error;
