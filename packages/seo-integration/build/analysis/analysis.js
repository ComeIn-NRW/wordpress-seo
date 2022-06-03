import { applyFilters } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { isObject, omit } from "lodash";
import { AnalysisWorkerWrapper, createWorker } from "yoastseo";
import createAnalyzeFunction from "./analyze";
/**
 * Creates the analysis worker.
 *
 * @param {string} workerUrl The URL of the analysis worker.
 * @param {string[]} dependencies The dependencies to load within the worker.
 *
 * @returns {AnalysisWorkerWrapper} The analysis worker wrapper.
 */

const createAnalysisWorkerWrapper = _ref => {
  let {
    workerUrl,
    dependencies
  } = _ref;
  const worker = createWorker(workerUrl);
  worker.postMessage({
    dependencies: dependencies
  });
  return new AnalysisWorkerWrapper(worker);
};
/**
 * Creates the analysis configuration.
 *
 * @param {Object} configuration The base configuration of the analysis worker.
 *
 * @returns {Object} The analysis configuration.
 */


const createAnalysisConfiguration = function () {
  let configuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const config = { ...omit(configuration, ["isReadabilityActive", "isSeoActive"]),
    isContentAnalysisActive: configuration.isReadabilityActive,
    isKeywordAnalysisActive: configuration.isSeoActive
  };
  const processedConfig = applyFilters("yoast.seoIntegration.analysis.configuration", config);
  return isObject(processedConfig) ? processedConfig : config;
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


const createAnalysis = async _ref2 => {
  let {
    workerUrl,
    dependencies,
    configuration = {}
  } = _ref2;
  const worker = createAnalysisWorkerWrapper({
    workerUrl,
    dependencies
  });

  try {
    await worker.initialize(createAnalysisConfiguration(configuration));
  } catch (e) {
    console.error(__("Something went wrong with loading the analysis, please refresh the page to try again.", "wordpress-seo"), e);
  }

  return {
    analysisWorker: worker,
    analyze: createAnalyzeFunction(worker, configuration)
  };
};

export default createAnalysis;
//# sourceMappingURL=analysis.js.map