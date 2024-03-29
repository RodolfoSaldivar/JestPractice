import {
	GET_ALL,
	LOADING,
	ERROR,
	CHANGE_USER,
	CHANGE_TITLE,
	SAVED,
	RELOAD,
	CLEAR
} from '../types/tasksTypes';

const INITIAL_STATE = {
	tasks: {},
	loading: false,
	error: '',
	user_id: '',
	title: '',
	return: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ALL:
			return {
				...state,
				tasks: action.payload,
				loading: false,
				error: '',
				return: false
			};

		case LOADING:
			return { ...state, loading: true };

		case ERROR:
			return { ...state, error: action.payload, loading: false };

		case CHANGE_USER:
			return { ...state, user_id: action.payload };

		case CHANGE_TITLE:
			return { ...state, title: action.payload };

		case SAVED:
			return {
				...state,
				tasks: {},
				loading: false,
				error: '',
				return: true,
				user_id: '',
				title: ''
			};

		case RELOAD:
			return { ...state, tasks: action.payload };

		case CLEAR:
			return { ...state, user_id: '', title: '' };

		default:
			return state;
	}
};
