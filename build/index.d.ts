type SpeedScores = {
    mobile: number;
    desktop: number;
};
type SpeedScoresSet = {
    current: SpeedScores;
    noBoost: SpeedScores | null;
    isStale: boolean;
};
interface ScoreValue {
    score: number;
    value: number;
}
interface SpeedHistoryDimension {
    mobile_overall_score: number;
    desktop_overall_score: number;
    mobile_lcp: ScoreValue;
    desktop_lcp: ScoreValue;
    mobile_tbt: ScoreValue;
    desktop_tbt: ScoreValue;
    mobile_cls: ScoreValue;
    desktop_cls: ScoreValue;
    mobile_si: ScoreValue;
    desktop_si: ScoreValue;
    mobile_tti: ScoreValue;
    desktop_tti: ScoreValue;
    mobile_fcp: ScoreValue;
    desktop_fcp: ScoreValue;
}
interface SpeedHistoryPeriod {
    timestamp: number;
    dimensions: SpeedHistoryDimension[];
}
interface SpeedHistoryResponse {
    data: {
        _meta: {
            start: number;
            end: number;
        };
        periods: SpeedHistoryPeriod[];
    };
}
/**
 * Kick off a request to generate speed scores for this site. Will automatically
 * poll for a response until the task is done, returning a SpeedScores object.
 *
 * @param {boolean} force - Force regenerate speed scores.
 * @param {string} rootUrl - Root URL for the HTTP request.
 * @param {string} siteUrl - URL of the site.
 * @param {string} nonce - Nonce to use for authentication.
 * @returns {SpeedScoresSet} Speed scores returned by the server.
 */
export declare function requestSpeedScores(force: boolean, rootUrl: string, siteUrl: string, nonce: string): Promise<SpeedScoresSet>;
/**
 * Get SpeedScores gistory to render the Graph.  Will automatically
 * poll for a response until the task is done, returning a SpeedHistory object.
 *
 * @param {string} rootUrl - Root URL for the HTTP request.
 * @param {string} siteUrl - URL of the site.
 * @param {string} nonce - Nonce to use for authentication.
 * @returns {SpeedHistoryResponse} Speed score history returned by the server.
 */
export declare function requestSpeedScoresHistory(rootUrl: string, siteUrl: string, nonce: string): Promise<SpeedHistoryResponse>;
/**
 * Given a mobile and desktop score, return a letter summarizing the overall
 * score.
 *
 * @param {number} mobile  - Mobile speed score
 * @param {number} desktop - Desktop speed score
 * @returns {string} letter score
 */
export declare function getScoreLetter(mobile: number, desktop: number): string;
/**
 * Find out if site scores changed. We fire a popout modal if they improve or worsen.
 * The message varies depending on the results of the speed scores so lets modify this
 *
 * @param {SpeedScoresSet} scores - Speed scores returned by the server.
 * @returns {boolean} true if scores changed.
 */
export declare function didScoresChange(scores: SpeedScoresSet): boolean;
/**
 * Determine the change in scores to pass through to other functions.
 *
 * @param {SpeedScoresSet} scores - Speed scores returned by the server.
 * @returns {number} - The change in scores in percentage.
 */
export declare function getScoreMovementPercentage(scores: SpeedScoresSet): number;
/**
 * Determine the number of days since the last timestamp.
 *
 * @param {number} timestamp - the timestamp returned by the server.
 * @returns {number} - The number of days.
 */
export declare function calculateDaysSince(timestamp: number): number;
export {};
