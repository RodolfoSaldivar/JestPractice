import {
	LOADING,
	ERROR,
	RELOAD,
	COM_LOADING,
	COM_ERROR,
	COM_RELOAD
} from '../types/postsTypes';

const INITIAL_STATE = {
	posts: [],
	loading: false,
	error: '',
	com_loading: false,
	com_error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RELOAD:
			return {
				...state,
				posts: action.payload,
				loading: false,
				error: ''
			};

		case LOADING:
			return { ...state, loading: true };

		case ERROR:
			return { ...state, error: action.payload, loading: false };

		case COM_RELOAD:
			return {
				...state,
				posts: action.payload,
				com_loading: false,
				com_error: ''
			};

		case COM_LOADING:
			return { ...state, com_loading: true };

		case COM_ERROR:
			return { ...state, com_error: action.payload, com_loading: false };

		default:
			return state;
	}
};
