import seoReducer, { seoActions } from "../../../src/form/slice/seo";

describe( "Seo slice", () => {
	// eslint-disable-next-line no-undefined
	const previousState = undefined;

	const initialState = {
		title: "",
		description: "",
		slug: "",
	};

	describe( "Reducer", () => {
		test( "should return the initial state", () => {
			expect( seoReducer( previousState, {} ) ).toEqual( initialState );
		} );

		test( "should update the title", () => {
			const { updateSeoTitle } = seoActions;

			const result = seoReducer( initialState, updateSeoTitle( "test" ) );

			expect( result ).toEqual( {
				...initialState,
				title: "test",
			} );
		} );

		test( "should update the description", () => {
			const { updateMetaDescription } = seoActions;

			const result = seoReducer( initialState, updateMetaDescription( "test" ) );

			expect( result ).toEqual( {
				...initialState,
				description: "test",
			} );
		} );

		test( "should update the slug", () => {
			const { updateSlug } = seoActions;

			const result = seoReducer( initialState, updateSlug( "test" ) );

			expect( result ).toEqual( {
				...initialState,
				slug: "test",
			} );
		} );
	} );
} );
