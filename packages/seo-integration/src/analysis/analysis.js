import { __ } from "@wordpress/i18n";
import { AnalysisWorkerWrapper, createWorker } from "yoastseo";

import createAnalyzeFunction from "./analyze";
import createAnalysisConfiguration from "./createAnalysisConfiguration";

/**
 * Creates the analysis worker.
 *
 * @param {string} workerUrl The URL of the analysis worker.
 * @param {string[]} dependencies The dependencies to load within the worker.
 *
 * @returns {AnalysisWorkerWrapper} The analysis worker wrapper.
 */
const createAnalysisWorkerWrapper = ( { workerUrl, dependencies } ) => {
	const worker = createWorker( workerUrl );

	worker.postMessage( { dependencies: dependencies } );

	return new AnalysisWorkerWrapper( worker );
};

/**
 * Creates the analysis worker.
 *
 * @param {string} workerUrl The URL of the analysis worker.
 * @param {string[]} dependencies The dependencies to load in the worker.
 * @param {Object} configuration The base configuration of the analysis worker.
 *
 * @returns {{ analysisWorker: Object, analyze: Function }} The analysis worker and analyze function.
 */
const createAnalysis = async ( { workerUrl, dependencies, configuration = {} } ) => {
	const worker = createAnalysisWorkerWrapper( { workerUrl, dependencies } );

	try {
		await worker.initialize( createAnalysisConfiguration( configuration ) );
	} catch ( e ) {
		console.error(
			__( "Something went wrong with loading the analysis, please refresh the page to try again.", "wordpress-seo" ),
			e,
		);
	}

	return {
		analysisWorker: worker,
		analyze: createAnalyzeFunction( worker, configuration ),
	};
};

export default createAnalysis;
