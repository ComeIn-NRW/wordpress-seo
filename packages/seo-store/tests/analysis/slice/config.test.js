import { curry, set } from "lodash";
import configReducer, { configActions, configSelectors } from "../../../src/analysis/slice/config";

describe( "Config slice", () => {
	// eslint-disable-next-line no-undefined
	const previousState = undefined;

	const initialState = {
		analysisType: "post",
		isSeoActive: true,
		isReadabilityActive: true,
		researches: [ "morphology" ],
		shouldApplyCornerstoneAnalysis: false,
	};

	describe( "Reducer", () => {
		test( "should return the initial state", () => {
			expect( configReducer( previousState, {} ) ).toEqual( initialState );
		} );

		test( "should update the analysis type", () => {
			const { updateAnalysisType } = configActions;

			const result = configReducer( previousState, updateAnalysisType( "term" ) );

			expect( result ).toEqual( {
				...initialState,
				analysisType: "term",
			} );
		} );

		test( "should update whether the SEO analysis is active", () => {
			const { updateIsSeoActive } = configActions;

			const result = configReducer( previousState, updateIsSeoActive( false ) );

			expect( result ).toEqual( {
				...initialState,
				isSeoActive: false,
			} );
		} );

		test( "should update whether the readability analysis is active", () => {
			const { updateIsReadabilityActive } = configActions;

			const result = configReducer( previousState, updateIsReadabilityActive( false ) );

			expect( result ).toEqual( {
				...initialState,
				isReadabilityActive: false,
			} );
		} );

		test( "should add a research", () => {
			const { addResearch } = configActions;

			const result = configReducer( previousState, addResearch( "test" ) );

			expect( result ).toEqual( {
				...initialState,
				researches: [ "morphology", "test" ],
			} );
		} );

		test( "should remove a research", () => {
			const { removeResearch } = configActions;

			const result = configReducer( previousState, removeResearch( "morphology" ) );

			expect( result ).toEqual( {
				...initialState,
				researches: [],
			} );
		} );
	} );

	describe( "Selectors", () => {
		const createStoreState = curry( set )( {}, "analysis.config" );

		test( "should select the configuration", () => {
			const { selectAnalysisConfig } = configSelectors;

			const result = selectAnalysisConfig( createStoreState( initialState ) );

			expect( result ).toEqual( initialState );
		} );

		test( "should select the analysis type", () => {
			const { selectAnalysisType } = configSelectors;

			const state = { ...initialState, analysisType: "category" };
			const result = selectAnalysisType( createStoreState( state ) );

			expect( result ).toBe( "category" );
		} );

		test( "should select the is SEO active", () => {
			const { selectIsSeoAnalysisActive } = configSelectors;

			const state = { ...initialState, isSeoActive: false };
			const result = selectIsSeoAnalysisActive( createStoreState( state ) );

			expect( result ).toBe( false );
		} );

		test( "should select the is readability active", () => {
			const { selectIsReadabilityAnalysisActive } = configSelectors;

			const state = { ...initialState, isReadabilityActive: false };
			const result = selectIsReadabilityAnalysisActive( createStoreState( state ) );

			expect( result ).toBe( false );
		} );

		test( "should select the researches", () => {
			const { selectResearches } = configSelectors;

			const state = { ...initialState, researches: [ "morphology", "test" ] };
			const result = selectResearches( createStoreState( state ) );

			expect( result ).toEqual( [ "morphology", "test" ] );
		} );
	} );
} );
