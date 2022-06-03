/**
 * @typedef {Object} AnalysisReportResult
 *
 * @property {number} score The score as a number.
 * @property {string} rating The rating, which is the interpreted score.
 * @property {string} text The feedback string.
 * @property {string} id Unique ID. Used in the mark button as ID and passed to the callback.
 * @property {Mark[]} marker The marks. Used as argument in the mark callback.
 * @property {string} markerId Should be the same as the ID, used to check if a mark button is pressed.
 * @property {bool} hasMarks Whether the result has something to mark.
 */

/**
 * @typedef {Object} AnalysisReportResults
 *
 * @property {AnalysisReportResult[]} errorsResults The error results.
 * @property {AnalysisReportResult[]} problemsResults The problem results.
 * @property {AnalysisReportResult[]} improvementsResults The improvement results.
 * @property {AnalysisReportResult[]} goodResults The good results.
 * @property {AnalysisReportResult[]} considerationsResults The consideration results.
 */
import { reduce } from "lodash";
import { interpreters } from "yoastseo";
/**
 * Maps an AssessmentResult to an analysis report result.
 *
 * So that it can be used by @yoast/analysis-report's ContentAnalysis.
 *
 * @param {Object} result Result provided by the analysis worker.
 * @param {string} idPrefix Prefix the ID with this, useful to namespace the results.
 *
 * @returns {AnalysisReportResult} The analysis report result.
 */

const transformAnalysisResult = function (result) {
  let idPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  const rating = interpreters.scoreToRating(result.score);
  let id = result.identifier;

  if (idPrefix.length > 0) {
    id = `${idPrefix}:${id}`;
  }

  return {
    id,
    markerId: id,
    text: result.text,
    score: result.score,
    // Because of inconsistency between `yoastseo` and `@yoast/analysis-report`.
    rating: rating === "ok" ? "OK" : rating,
    hasMarks: result.marks.length > 0,

    /*
     * Returning the marks instead of the marker to decouple the marker from the results. Leaving the marking to the UI.
     * This is done here to be able to leave the AnalysisList package alone, where the `marker` is the attribute passed to the button callback.
     */
    marker: result.marks
  };
};
/**
 * Transforms the analysis results, while grouping them by rating.
 *
 * @param {AssessmentResult[]} results The assessment results, as returned by the analysis.
 * @param {string} [idPrefix] Prefix the ID with this, useful to namespace the results.
 *
 * @returns {Object.<string, AnalysisReportResults[]>} The assessment results, grouped by rating.
 */


export const transformAnalysisResults = function () {
  let results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let idPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return reduce(results, (grouped, result) => {
    const transformed = transformAnalysisResult(result, idPrefix); // Filter out empty results.

    if (transformed.text === "") {
      return grouped;
    }

    switch (transformed.rating) {
      case "error":
        grouped.errorsResults.push(transformed);
        break;

      case "feedback":
        grouped.considerationsResults.push(transformed);
        break;

      case "bad":
        grouped.problemsResults.push(transformed);
        break;

      case "ok":
      case "OK":
        grouped.improvementsResults.push(transformed);
        break;

      case "good":
        grouped.goodResults.push(transformed);
        break;
    }

    return grouped;
  }, {
    errorsResults: [],
    problemsResults: [],
    improvementsResults: [],
    goodResults: [],
    considerationsResults: []
  });
};
//# sourceMappingURL=transformAnalysisResults.js.map