import { __ } from '@wordpress/i18n';
import api from './api';
import { castToNumber } from './utils/cast-to-number';
import { castToString } from './utils/cast-to-string';
import { isJsonObject, JSONObject } from './utils/json-types';
import pollPromise from './utils/poll-promise';
import { standardizeError } from './utils/standardize-error';

const pollTimeout = 2 * 60 * 1000;
const pollInterval = 5 * 1000;

type SpeedScores = {
	mobile: number;
	desktop: number;
};

type SpeedScoresSet = {
	current: SpeedScores;
	noBoost: SpeedScores;
	isStale: boolean;
};

type ParsedApiResponse = {
	status: string;
	scores?: SpeedScoresSet;
};

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
export async function requestSpeedScores(
	force = false,
	rootUrl: string,
	siteUrl: string,
	nonce: string
): Promise< SpeedScoresSet > {
	// Request metrics
	const response = parseResponse(
		await api.post(
			rootUrl,
			force ? '/speed-scores/refresh' : '/speed-scores',
			{ url: siteUrl },
			nonce
		)
	);

	// If the response contains ready-to-use metrics, we're done here.
	if ( response.scores ) {
		return response.scores;
	}

	// Poll for metrics.
	return await pollRequest( rootUrl, siteUrl, nonce );
}

/**
 * Helper method for parsing a response from a speed score API request. Returns
 * scores (if ready), and a status (success|pending|error).
 *
 * @param {JSONObject} response - API response to parse
 * @returns {ParsedApiResponse} API response, processed.
 */
function parseResponse( response: JSONObject ): ParsedApiResponse {
	// Handle an explicit error
	if ( response.error ) {
		const defaultErrorMessage = __(
			'An unknown error occurred while requesting metrics',
			'boost-score-api'
		);

		throw standardizeError( response.error, defaultErrorMessage );
	}

	// Check if ready.
	if ( isJsonObject( response.scores ) ) {
		return {
			status: 'success',
			scores: {
				current: isJsonObject( response.scores.current )
					? {
							mobile: castToNumber( response.scores.current.mobile, 0 ),
							desktop: castToNumber( response.scores.current.desktop, 0 ),
					  }
					: {
							mobile: 0,
							desktop: 0,
					  },
				noBoost: isJsonObject( response.scores.noBoost )
					? {
							mobile: castToNumber( response.scores.noBoost.mobile, 0 ),
							desktop: castToNumber( response.scores.noBoost.desktop, 0 ),
					  }
					: null,
				isStale: !! response.scores.isStale,
			},
		};
	}

	const requestStatus = castToString( response.status );
	if ( ! requestStatus ) {
		throw new Error( __( 'Invalid response while requesting metrics', 'boost-score-api' ) );
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
 * @param {string} nonce - Nonce to use for authentication
 * @returns {SpeedScoresSet} Speed scores returned by the server.
 */
async function pollRequest(
	rootUrl: string,
	siteUrl: string,
	nonce: string
): Promise< SpeedScoresSet > {
	return pollPromise< SpeedScoresSet >( {
		timeout: pollTimeout,
		interval: pollInterval,
		timeoutError: __( 'Timed out while waiting for speed-score.', 'boost-score-api' ),
		callback: async resolve => {
			const response = parseResponse(
				await api.post( rootUrl, '/speed-scores', { url: siteUrl }, nonce )
			);

			if ( response.scores ) {
				resolve( response.scores );
			}
		},
	} );
}

/**
 * Given a mobile and desktop score, return a letter summarizing the overall
 * score.
 *
 * @param {number} mobile  - Mobile speed score
 * @param {number} desktop - Desktop speed score
 * @returns {string} letter score
 */
export function getScoreLetter( mobile: number, desktop: number ): string {
	const sum = mobile + desktop;
	const averageScore = sum / 2;

	if ( averageScore > 90 ) {
		return 'A';
	}
	if ( averageScore > 75 ) {
		return 'B';
	}
	if ( averageScore > 50 ) {
		return 'C';
	}
	if ( averageScore > 35 ) {
		return 'D';
	}
	if ( averageScore > 25 ) {
		return 'E';
	}
	return 'F';
}

/**
 * Find out if site scores changed. We fire a popout modal if they improve or worsen.
 * The message varies depending on the results of the speed scores so lets modify this
 *
 * @param {SpeedScoresSet} scores - Speed scores returned by the server.
 * @returns {boolean} true if scores changed.
 */
export function didScoresChange( scores: SpeedScoresSet ): boolean {
	const current = scores.current;
	const noBoost = scores.noBoost;

	// lets make this a little bit more readable. If one of the scores is null.
	// then the scores haven't changed. So return false.
	if ( null == current || null == noBoost ) {
		return false;
	}

	// if either the mobile or the desktop scores have changed. Return true.
	if ( current.mobile !== noBoost.mobile || current.desktop !== noBoost.desktop ) {
		return true;
	}

	//else if reach here then the scores are the same.
	return false;
}

/**
 * Determine the change in scores to pass through to other functions.
 *
 * @param {SpeedScoresSet} scores - Speed scores returned by the server.
 * @returns {number} - The change in scores in percentage.
 */
export function getScoreMovementPercentage( scores: SpeedScoresSet ): number {
	const current = scores.current;
	const noBoost = scores.noBoost;
	let currentScore = 0;
	let noBoostScore = 0;

	if ( current !== null && noBoost !== null ) {
		currentScore = scores.current.mobile + scores.current.desktop;
		noBoostScore = scores.noBoost.mobile + scores.noBoost.desktop;
		const change = currentScore / noBoostScore - 1;
		return Math.round( change * 100 );
	}
	return 0;
}
