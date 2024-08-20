import type { JSONObject } from './utils/json-object-type';
/**
 * Make a GET request to the Boost REST API.
 *
 * @param {string} root  - The root URL to use.
 * @param {string} path  - The path to the endpoint.
 * @param {string} nonce - The nonce to use.
 * @return {Promise} - The response.
 */
declare function get<T = JSONObject>(root: string, path: string, nonce: string): Promise<T>;
/**
 * Make a POST request to the Boost REST API.
 *
 * @param {string}            root  - The root URL to use.
 * @param {string}            path  - The path to the endpoint.
 * @param {null | JSONObject} body  - The body of the request.
 * @param {string}            nonce - The nonce to use.
 * @return {Promise} - The response.
 */
declare function post<T = JSONObject>(root: string, path: string, body: JSONObject | null, nonce: string): Promise<T>;
declare const _default: {
    get: typeof get;
    post: typeof post;
};
export default _default;
