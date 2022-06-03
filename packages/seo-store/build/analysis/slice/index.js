import { createSelector } from "@reduxjs/toolkit";
import { combineReducers } from "@wordpress/data";
import { editorSelectors } from "../../editor/slice";
import { formSelectors } from "../../form/slice";
import configReducer, { configActions, configSelectors, defaultConfigState } from "./config";
import resultsReducer, { resultsActions, resultsSelectors, defaultResultsState } from "./results";
export const defaultAnalysisState = {
  config: defaultConfigState,
  results: defaultResultsState
};
export const analysisSelectors = { ...resultsSelectors,
  ...configSelectors,
  selectPaper: createSelector(formSelectors.selectSeoTitle, formSelectors.selectMetaDescription, formSelectors.selectSlug, editorSelectors.selectContent, editorSelectors.selectPermalink, editorSelectors.selectDate, (seoTitle, metaDescription, slug, content, permalink, date) => ({
    seoTitle,
    metaDescription,
    slug,
    content,
    permalink,
    date
  }))
};
export const analysisActions = { ...resultsActions,
  ...configActions
};
export default combineReducers({
  config: configReducer,
  results: resultsReducer
});
//# sourceMappingURL=index.js.map