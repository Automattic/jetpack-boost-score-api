/**
 * JavaScript offers no guarantee that caught objects in catch blocks are actually
 * Error objects. This method fixes that, for type safety. :)
 *
 * @param {unknown} data           - Any thrown error data to interpret as an Error (or subclass)
 * @param {string}  defaultMessage - A default message to throw if no sensible error can be found.
 * @return {Error} the data guaranteed to be an Error or subclass thereof.
 */
export declare function standardizeError(data: unknown, defaultMessage?: string): Error;
