"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizeError = void 0;
exports.requestSpeedScores = requestSpeedScores;
exports.requestSpeedScoresHistory = requestSpeedScoresHistory;
exports.getScoreLetter = getScoreLetter;
exports.didScoresChange = didScoresChange;
exports.getScoreMovementPercentage = getScoreMovementPercentage;
exports.calculateDaysSince = calculateDaysSince;
const i18n_1 = require("@wordpress/i18n");
const api_1 = __importDefault(require("./api"));
const cast_to_number_1 = require("./utils/cast-to-number");
const cast_to_string_1 = require("./utils/cast-to-string");
const json_types_1 = require("./utils/json-types");
const poll_promise_1 = __importDefault(require("./utils/poll-promise"));
const standardize_error_1 = require("./utils/standardize-error");
Object.defineProperty(exports, "standardizeError", { enumerable: true, get: function () { return standardize_error_1.standardizeError; } });
// Four minutes covers the large majority of successful runs, including queue
// and poll overhead. Over the seven days to 26 August 2026, about 0.9% of
// production runs took longer than two minutes and about 0.04% took longer
// than four. A timeout here therefore does not mean the run failed.
const pollTimeout = 4 * 60 * 1000;
const pollInterval = 5 * 1000;
/**
 * Kick off a request to generate speed scores for this site. Will automatically
 * poll for a response until the task is done, returning a SpeedScores object.
 *
 * @param {boolean} force   - Force regenerate speed scores.
 * @param {string}  rootUrl - Root URL for the HTTP request.
 * @param {string}  siteUrl - URL of the site.
 * @param {string}  nonce   - Nonce to use for authentication.
 * @return {SpeedScoresSet} Speed scores returned by the server.
 */
async function requestSpeedScores(force = false, rootUrl, siteUrl, nonce) {
    // Request metrics
    const response = parseResponse(await api_1.default.post(rootUrl, force ? '/speed-scores/refresh' : '/speed-scores', { url: siteUrl }, nonce));
    // If the response contains ready-to-use metrics, we're done here.
    if (response.scores) {
        return response.scores;
    }
    // Poll for metrics.
    return await pollRequest(rootUrl, siteUrl, nonce);
}
/**
 * Get SpeedScores gistory to render the Graph.  Will automatically
 * poll for a response until the task is done, returning a SpeedHistory object.
 *
 * @param {string} rootUrl - Root URL for the HTTP request.
 * @param {string} siteUrl - URL of the site.
 * @param {string} nonce   - Nonce to use for authentication.
 * @return {SpeedHistoryResponse} Speed score history returned by the server.
 */
async function requestSpeedScoresHistory(rootUrl, siteUrl, nonce) {
    const end = new Date().getTime();
    const start = end - 1000 * 60 * 60 * 24 * 30; // 30 days ago
    // Request metrics
    const response = await api_1.default.post(rootUrl, '/speed-scores-history', { start, end }, nonce);
    return response;
}
/**
 * Helper method for parsing a response from a speed score API request. Returns
 * scores (if ready), and a status (success|pending|error).
 *
 * @param {JSONObject} response - API response to parse
 * @return {ParsedApiResponse} API response, processed.
 */
function parseResponse(response) {
    // Handle an explicit error
    if (response.error) {
        const defaultErrorMessage = (0, i18n_1.__)('An unknown error occurred while requesting metrics', 'boost-score-api');
        throw (0, standardize_error_1.standardizeError)(response.error, defaultErrorMessage);
    }
    // Check if ready.
    if ((0, json_types_1.isJsonObject)(response.scores)) {
        return {
            status: 'success',
            scores: {
                current: (0, json_types_1.isJsonObject)(response.scores.current)
                    ? {
                        mobile: (0, cast_to_number_1.castToNumber)(response.scores.current.mobile, 0),
                        desktop: (0, cast_to_number_1.castToNumber)(response.scores.current.desktop, 0),
                    }
                    : {
                        mobile: 0,
                        desktop: 0,
                    },
                noBoost: (0, json_types_1.isJsonObject)(response.scores.noBoost)
                    ? {
                        mobile: (0, cast_to_number_1.castToNumber)(response.scores.noBoost.mobile, 0),
                        desktop: (0, cast_to_number_1.castToNumber)(response.scores.noBoost.desktop, 0),
                    }
                    : null,
                isStale: !!response.scores.isStale,
            },
        };
    }
    const requestStatus = (0, cast_to_string_1.castToString)(response.status);
    if (!requestStatus) {
        throw new Error((0, i18n_1.__)('Invalid response while requesting metrics', 'boost-score-api'));
    }
    return {
        status: requestStatus,
    };
}
/**
 * Poll a speed score request for results, timing out if it takes too long.
 *
 * @param {string} rootUrl - Root URL of the site to request metrics for
 * @param {string} siteUrl - Site URL to request metrics for
 * @param {string} nonce   - Nonce to use for authentication
 * @return {SpeedScoresSet} Speed scores returned by the server.
 */
async function pollRequest(rootUrl, siteUrl, nonce) {
    return (0, poll_promise_1.default)({
        timeout: pollTimeout,
        interval: pollInterval,
        timeoutError: (0, i18n_1.__)('Timed out while waiting for speed-score.', 'boost-score-api'),
        callback: async (resolve) => {
            const response = parseResponse(await api_1.default.post(rootUrl, '/speed-scores', { url: siteUrl }, nonce));
            if (response.scores) {
                resolve(response.scores);
            }
        },
    });
}
/**
 * Given a mobile and desktop score, return a letter summarizing the overall
 * score.
 *
 * @param {number} mobile  - Mobile speed score
 * @param {number} desktop - Desktop speed score
 * @return {string} letter score
 */
function getScoreLetter(mobile, desktop) {
    const sum = mobile + desktop;
    const averageScore = sum / 2;
    if (averageScore > 90) {
        return 'A';
    }
    if (averageScore > 75) {
        return 'B';
    }
    if (averageScore > 50) {
        return 'C';
    }
    if (averageScore > 35) {
        return 'D';
    }
    if (averageScore > 25) {
        return 'E';
    }
    return 'F';
}
/**
 * Find out if site scores changed. We fire a popout modal if they improve or worsen.
 * The message varies depending on the results of the speed scores so lets modify this
 *
 * @param {SpeedScoresSet} scores - Speed scores returned by the server.
 * @return {boolean} true if scores changed.
 */
function didScoresChange(scores) {
    const current = scores.current;
    const noBoost = scores.noBoost;
    // lets make this a little bit more readable. If one of the scores is null.
    // then the scores haven't changed. So return false.
    if (null == current || null == noBoost) {
        return false;
    }
    // if either the mobile or the desktop scores have changed. Return true.
    if (current.mobile !== noBoost.mobile || current.desktop !== noBoost.desktop) {
        return true;
    }
    //else if reach here then the scores are the same.
    return false;
}
/**
 * Determine the change in scores to pass through to other functions.
 *
 * @param {SpeedScoresSet} scores - Speed scores returned by the server.
 * @return {number} - The change in scores in percentage.
 */
function getScoreMovementPercentage(scores) {
    const current = scores.current;
    const noBoost = scores.noBoost;
    if (current !== null && noBoost !== null) {
        const currentScore = scores.current.mobile + scores.current.desktop;
        const noBoostScore = scores.noBoost.mobile + scores.noBoost.desktop;
        const change = currentScore / noBoostScore - 1;
        return Math.round(change * 100);
    }
    return 0;
}
/**
 * Determine the number of days since the last timestamp.
 *
 * @param {number} timestamp - the timestamp returned by the server.
 * @return {number} - The number of days.
 */
function calculateDaysSince(timestamp) {
    // Create Date objects for the provided timestamp and the current date
    const providedDate = new Date(timestamp);
    const currentDate = new Date();
    // Calculate the difference in milliseconds between the two dates
    const differenceInMilliseconds = currentDate.valueOf() - providedDate.valueOf();
    // Convert milliseconds to days
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);
    return differenceInDays;
}
//# sourceMappingURL=index.js.map