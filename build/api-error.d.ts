import type { JSONObject } from './utils/json-object-type';
/**
 * Special error subclass returned by API Calls with extra
 * information.
 */
export declare class ApiError extends Error {
    readonly httpCode: number;
    readonly body: JSONObject | string | null;
    readonly parseError: Error | null;
    constructor(httpCode: number, body: JSONObject | string | null, parseError: Error | null);
    get message(): string;
    getDisplayBody(): string;
    getRestApiErrorMessage(): string;
}
