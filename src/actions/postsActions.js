import axios from 'axios';
import {
	LOADING,
	ERROR,
	RELOAD,
	COM_LOADING,
	COM_ERROR,
	COM_RELOAD
} from '../types/postsTypes';
import * as usersTypes from '../types/usersTypes';

const { GET_ALL: USERS_GET_ALL } = usersTypes;

export const getByUser = (key) => async (dispatch, getState) => {
	dispatch({
		type: LOADING
	});

	let { users } = getState().usersReducer;
	const { posts } = getState().postsReducer;
	const user_id = users[key].id;

	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`
		);
		const new_posts = response.data.map((post) => ({
			...post,
			comments: [],
			open: false
		}));
		const updated_posts = [...posts, new_posts];

		dispatch({
			type: RELOAD,
			payload: updated_posts
		});

		const posts_key = updated_posts.length - 1;
		const updated_users = [...users];
		updated_users[key] = {
			...users[key],
			posts_key
		};

		dispatch({
			type: USERS_GET_ALL,
			payload: updated_users
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Posts unavailable.'
		});
	}
};

export const openClose = (pst_key, com_key) => (dispatch, getState) => {
	const { posts } = getState().postsReducer;
	const selected = posts[pst_key][com_key];

	const updated = {
		...selected,
		open: !selected.open
	};

	const updated_posts = [...posts];

	updated_posts[pst_key] = [...posts[pst_key]];
	updated_posts[pst_key][com_key] = updated;

	dispatch({
		type: RELOAD,
		payload: updated_posts
	});
};

export const getComments = (pst_key, com_key) => async (dispatch, getState) => {
	dispatch({
		type: COM_LOADING
	});

	const { posts } = getState().postsReducer;
	const selected = posts[pst_key][com_key];

	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`
		);

		const updated = {
			...selected,
			comments: response.data
		};

		const updated_posts = [...posts];

		updated_posts[pst_key] = [...posts[pst_key]];
		updated_posts[pst_key][com_key] = updated;

		dispatch({
			type: COM_RELOAD,
			payload: updated_posts
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: COM_ERROR,
			payload: 'Comments unavailable.'
		});
	}
};
