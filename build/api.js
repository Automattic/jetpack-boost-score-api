"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@wordpress/i18n");
const api_error_1 = require("./api-error");
const config_1 = require("./config");
/**
 * Get the full URL to an endpoint.
 *
 * @param {string} path - The path to the endpoint.
 * @param {string} root - The root URL to use.
 * @return {string} - The full URL.
 */
function getEndpointUrl(path, root) {
    return root + config_1.JETPACK_BOOST_REST_NAMESPACE + config_1.JETPACK_BOOST_REST_PREFIX + path;
}
/**
 * Send a request to the Boost REST API.
 *
 * @param {string}            method - The HTTP method to use.
 * @param {string}            root   - The root URL to use.
 * @param {string}            path   - The path to the endpoint.
 * @param {null | JSONObject} body   - The body of the request.
 * @param {string}            nonce  - The nonce to use.
 * @return {Promise} - The response.
 */
async function sendRequest(method, root, path, body = null, nonce) {
    const args = {
        method,
        mode: 'cors',
        headers: {
            'X-WP-Nonce': nonce,
        },
    };
    if (('post' === method || 'delete' === method) && body) {
        args.body = JSON.stringify(body);
        args.headers['Content-Type'] = 'application/json';
    }
    const endpointFullUrl = getEndpointUrl(path, root);
    let apiCall;
    try {
        apiCall = await fetch(endpointFullUrl, args);
    }
    catch (error) {
        const cleanupArgs = args;
        delete cleanupArgs.body;
        delete cleanupArgs.headers['X-WP-Nonce'];
        const errorInfo = {
            requestInitiator: window.location.href,
            requestUrl: endpointFullUrl,
            requestArgs: cleanupArgs,
            originalErrorMessage: error.toString(),
        };
        // Throwing again an error so it can be caught higher up and displayed in the UI.
        throw new Error((0, i18n_1.sprintf)(
        /* Translators: %s refers to a string representation of an error object containing useful debug information  */
        (0, i18n_1.__)('An error occurred while trying to communicate with the site REST API. Extra debug info: %s', 'boost-score-api'), JSON.stringify(errorInfo)), { cause: error });
    }
    return apiCall;
}
/**
 * Make a request to the Boost REST API.
 *
 * @param {string}            method - The HTTP method to use.
 * @param {string}            root   - The root URL to use.
 * @param {string}            path   - The path to the endpoint.
 * @param {null | JSONObject} body   - The body of the request.
 * @param {string}            nonce  - The nonce to use.
 * @return {Promise} - The response.
 */
async function makeRequest(method, root, path, body = null, nonce) {
    const response = await sendRequest(method, root, path, body, nonce);
    // Fetch response as text.
    let responseBody;
    try {
        responseBody = await response.text();
    }
    catch (err) {
        throw new api_error_1.ApiError(response.status, null, err);
    }
    // Try to parse it as JSON, catch errors explicitly.
    let jsonBody;
    try {
        jsonBody = JSON.parse(responseBody);
    }
    catch (err) {
        throw new api_error_1.ApiError(response.status, responseBody, err);
    }
    // Throw an error if not HTTP 200.
    if (!response.ok) {
        throw new api_error_1.ApiError(response.status, jsonBody, null);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return jsonBody;
}
/**
 * Make a GET request to the Boost REST API.
 *
 * @param {string} root  - The root URL to use.
 * @param {string} path  - The path to the endpoint.
 * @param {string} nonce - The nonce to use.
 * @return {Promise} - The response.
 */
function get(root, path, nonce) {
    return makeRequest('get', root, path, null, nonce);
}
/**
 * Make a POST request to the Boost REST API.
 *
 * @param {string}            root  - The root URL to use.
 * @param {string}            path  - The path to the endpoint.
 * @param {null | JSONObject} body  - The body of the request.
 * @param {string}            nonce - The nonce to use.
 * @return {Promise} - The response.
 */
function post(root, path, body = null, nonce) {
    return makeRequest('post', root, path, body, nonce);
}
exports.default = {
    get,
    post,
};
//# sourceMappingURL=api.js.map