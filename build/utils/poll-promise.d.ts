type Resolve<RetType = void> = (value: RetType | PromiseLike<RetType>) => void;
type PollPromiseArgs<RetType = void> = {
    interval: number;
    timeout: number;
    timeoutError?: string;
    callback: (resolve: Resolve<RetType>) => Promise<void> | void;
};
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
 * @returns {Promise< RetType >} - A promise which resolves to the value resolved() inside callback.
 */
export default function pollPromise<RetType = void>({ interval, callback, timeout, timeoutError, }: PollPromiseArgs<RetType>): Promise<RetType>;
export {};
