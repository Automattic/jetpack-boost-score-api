"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const i18n_1 = require("@wordpress/i18n");
const cast_to_string_1 = require("./utils/cast-to-string");
const json_types_1 = require("./utils/json-types");
/**
 * Special error subclass returned by API Calls with extra
 * information.
 */
class ApiError extends Error {
    httpCode;
    body;
    parseError;
    constructor(httpCode, body, parseError) {
        super();
        this.httpCode = httpCode;
        this.body = body;
        this.parseError = parseError;
    }
    // Override Error.message to generate a message based on http code and json body.
    get message() {
        switch (this.httpCode) {
            case 403: {
                return this.getRestApiErrorMessage();
            }
            // For HTTP 200 responses, look for JSON parsing issues.
            case 200: {
                if (this.parseError) {
                    return (0, i18n_1.sprintf)(
                    /* Translators: %s refers to a browser-supplied error message (hopefully already in the right language) */
                    (0, i18n_1.__)('Received invalid response while communicating with your WordPress site: %s', 'boost-score-api'), this.parseError.message);
                }
                break;
            }
        }
        return (0, i18n_1.sprintf)(
        /* Translators: %d refers to numeric HTTP error code */
        (0, i18n_1.__)('HTTP %d error received while communicating with the server.', 'boost-score-api'), this.httpCode);
    }
    // Returns the body of this in a string format for display. Pretty printed JSON if valid, raw dump if not.
    getDisplayBody() {
        if ((0, json_types_1.isJsonObject)(this.body)) {
            return JSON.stringify(this.body, null, '  ');
        }
        return (0, cast_to_string_1.castToString)(this.body, '').substring(0, 1000);
    }
    // Returns an error message appropriate for a site whose API doesn't seem to be available.
    getRestApiErrorMessage() {
        return (0, i18n_1.__)("Your site's REST API does not seem to be accessible. Jetpack Boost requires access to your REST API in order to receive site performance scores. Please make sure that your site's REST API is active and accessible, and try again.", 'boost-score-api');
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api-error.js.map