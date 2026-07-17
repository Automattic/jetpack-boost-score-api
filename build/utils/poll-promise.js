"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pollPromise;
const i18n_1 = require("@wordpress/i18n");
/**
 * Repeatedly poll callback every <interval> milliseconds until it calls the
 * resolve() callback. If the callback throws an error, the whole polling
 * promise will reject.
 *
 * Rejects with a timeout after <timeout> milliseconds.
 *
 * @template RetType
 * @param {object}   obj              - Arguments object.
 * @param {number}   obj.interval     - Milliseconds between calling callback
 * @param {number}   obj.timeout      - Milliseconds before rejecting w/ a timeout
 * @param {Function} obj.callback     - Callback to call every <interval> ms.
 * @param {string}   obj.timeoutError - Message to throw on timeout.
 * @return {Promise< RetType >} - A promise which resolves to the value resolved() inside callback.
 */
async function pollPromise({ interval, callback, timeout, timeoutError, }) {
    let timeoutHandle, intervalHandle;
    return new Promise((resolve, reject) => {
        timeoutHandle = setTimeout(() => {
            reject(new Error(timeoutError || (0, i18n_1.__)('Timed out', 'boost-score-api')));
        }, timeout || 2 * 60 * 1000);
        intervalHandle = setInterval(async () => {
            try {
                await Promise.resolve(callback(resolve));
            }
            catch (err) {
                reject(err);
            }
        }, interval);
    }).finally(() => {
        clearTimeout(timeoutHandle);
        clearInterval(intervalHandle);
    });
}
//# sourceMappingURL=poll-promise.js.map