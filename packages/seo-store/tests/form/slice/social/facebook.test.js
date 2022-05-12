import { curry, set } from "lodash";
import facebookReducer, { facebookActions, facebookSelectors } from "../../../../src/form/slice/social/facebook";

describe( "a test for facebook slice", () => {
	// eslint-disable-next-line no-undefined
	const previousState = undefined;

	const initialState = {
		title: "",
		description: "",
		image: {},
	};

	describe( "a test for facebook reducer", () => {
		test( "should return the initial state", () => {
			expect( facebookReducer( previousState, {} ) ).toEqual( initialState );
		} );

		test( "should update the title", () => {
			const { updateFacebookTitle } = facebookActions;

			const result = facebookReducer( initialState, updateFacebookTitle( "Catfluencer on Facebook" ) );

			expect( result ).toEqual( {
				...initialState,
				title: "Catfluencer on Facebook",
			} );
		} );

		test( "should update the description", () => {
			const { updateFacebookDescription } = facebookActions;

			const result = facebookReducer( initialState, updateFacebookDescription( "How to be a purr-fect catfluencer on Facebook." ) );

			expect( result ).toEqual( {
				...initialState,
				description: "How to be a purr-fect catfluencer on Facebook.",
			} );
		} );

		test( "should update the image", () => {
			const { updateFacebookImage } = facebookActions;

			const result = facebookReducer( initialState, updateFacebookImage( {
				id: 1,
				url: "https://example.com/catfluencer",
				width: 500,
				height: 600,
				alt: "A sleeping cat",
			} ) );

			expect( result ).toEqual( {
				...initialState,
				image: {
					id: 1,
					url: "https://example.com/catfluencer",
					width: 500,
					height: 600,
					alt: "A sleeping cat",
				},
			} );
		} );

		test( "should update the Facebook data", () => {
			const { updateFacebookData } = facebookActions;

			const result = facebookReducer( initialState, updateFacebookData( {
				title: "new title",
				description: "new title",
				image: {
					id: 1,
					url: "https://example.com/images/cats.jpeg",
				},
			} ) );

			expect( result ).toEqual( {
				title: "new title",
				description: "new title",
				image: {
					id: 1,
					url: "https://example.com/images/cats.jpeg",
				},
			} );
		} );

		test( "should remove image from Facebook data", () => {
			const { clearFacebookPreviewImage } = facebookActions;

			const result = facebookReducer( initialState, clearFacebookPreviewImage() );

			expect( result ).toEqual( {
				...initialState,
				image: {},
			} );
		} );
	} );

	describe( "a test for facebook selectors", () => {
		const createStoreState = curry( set )( {}, "form.social" );

		test( "should select the facebook title", () => {
			const { selectFacebookTitle } = facebookSelectors;

			const state = {
				facebook: {
					title: "Excelling in catfluencer role on Facebook",
				},
			};
			const result = selectFacebookTitle( createStoreState( state ) );

			expect( result ).toEqual( "Excelling in catfluencer role on Facebook" );
		} );

		test( "should select the facebook description", () => {
			const { selectFacebookDescription } = facebookSelectors;

			const state = {
				facebook: {
					description: "What it means to be a catfluencer and what treats should we present to our cats so they can excel in being one.",
				},
			};
			const result = selectFacebookDescription( createStoreState( state ) );

			expect( result ).toEqual( "What it means to be a catfluencer and what treats should we present to our cats so they can excel in being one." );
		} );

		test( "should select the facebook image", () => {
			const { selectFacebookImage } = facebookSelectors;

			const state = {
				facebook: {
					image: {
						id: 1,
						url: "https://example.com/catfluencer-meowdel",
						width: 500,
						height: 600,
						alt: "A sleeping cat",
					},
				},
			};
			const result = selectFacebookImage( createStoreState( state ) );

			expect( result ).toEqual( {
				id: 1,
				url: "https://example.com/catfluencer-meowdel",
				width: 500,
				height: 600,
				alt: "A sleeping cat",
			} );
		} );

		test( "should select the facebook image URL", () => {
			const { selectFacebookImageURL } = facebookSelectors;

			const state = {
				facebook: {
					image: {
						id: 1,
						url: "https://example.com/catfluencer-meowdel",
						width: 500,
						height: 600,
						alt: "A sleeping cat",
					},
				},
			};
			const result = selectFacebookImageURL( createStoreState( state ) );

			expect( result ).toEqual( "https://example.com/catfluencer-meowdel" );
		} );

		test( "should select the facebook image ID", () => {
			const { selectFacebookImageID } = facebookSelectors;

			const state = {
				facebook: {
					image: {
						id: 1,
						url: "https://example.com/catfluencer-meowdel",
						width: 500,
						height: 600,
						alt: "A sleeping cat",
					},
				},
			};
			const result = selectFacebookImageID( createStoreState( state ) );

			expect( result ).toEqual( 1 );
		} );

		test( "should select the facebook data", () => {
			const { selectFacebook } = facebookSelectors;

			const state = {
				facebook: {
					title: "Catfluencer on Facebook",
					description: "How to be a purr-fect catfluencer on Facebook.",
					image: {
						id: 1,
						url: "https://example.com/catfluencer-meowdel",
						width: 500,
						height: 600,
						alt: "A sleeping cat",
					},
				},
			};
			const result = selectFacebook( createStoreState( state ) );

			expect( result ).toEqual( {
				title: "Catfluencer on Facebook",
				description: "How to be a purr-fect catfluencer on Facebook.",
				image: {
					id: 1,
					url: "https://example.com/catfluencer-meowdel",
					width: 500,
					height: 600,
					alt: "A sleeping cat",
				},
			} );
		} );
	} );
} );
