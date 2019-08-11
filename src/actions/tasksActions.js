import axios from 'axios';
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

export const getAll = () => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/todos'
		);

		const tasks = {};
		response.data.map(
			(tsk) =>
				(tasks[tsk.userId] = {
					...tasks[tsk.userId],
					[tsk.id]: {
						...tsk
					}
				})
		);

		dispatch({
			type: GET_ALL,
			payload: tasks
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Tasks unavailable.'
		});
	}
};

export const changeUserId = (value) => (dispatch) => {
	dispatch({
		type: CHANGE_USER,
		payload: value
	});
};

export const changeTitle = (value) => (dispatch) => {
	dispatch({
		type: CHANGE_TITLE,
		payload: value
	});
};

export const add = (new_task) => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		await axios.post('https://jsonplaceholder.typicode.com/todos', new_task);
		dispatch({
			type: SAVED
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Try later.'
		});
	}
};

export const update = (updated_task) => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		await axios.put(
			`https://jsonplaceholder.typicode.com/todos/${updated_task.id}`,
			updated_task
		);
		dispatch({
			type: SAVED
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Try later.'
		});
	}
};

export const checkChange = (us_id, tsk_id) => (dispatch, getState) => {
	const { tasks } = getState().tasksReducer;
	const selected = tasks[us_id][tsk_id];

	const updated = {
		...tasks
	};
	updated[us_id] = {
		...tasks[us_id]
	};
	updated[us_id][tsk_id] = {
		...tasks[us_id][tsk_id],
		completed: !selected.completed
	};

	dispatch({
		type: RELOAD,
		payload: updated
	});
};

export const remove = (tsk_id) => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		await axios.delete(
			`https://jsonplaceholder.typicode.com/todos/${tsk_id}`
		);
		dispatch({
			type: GET_ALL,
			payload: {}
		});
	} catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Try later.'
		});
	}
};

export const clearForm = () => (dispatch) => {
	dispatch({
		type: CLEAR
	});
};
