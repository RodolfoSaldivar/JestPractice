import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as tasksActions from '../../actions/tasksActions';

export class Save extends Component {
	componentDidMount() {
		const {
			match: {
				params: { us_id, tsk_id }
			},
			tasks,
			changeUserId,
			changeTitle,
			clearForm
		} = this.props;

		if (us_id && tsk_id) {
			const task = tasks[us_id][tsk_id];
			changeUserId(task.userId);
			changeTitle(task.title);
		} else {
			clearForm();
		}
	}

	changeUserId = (event) => {
		this.props.changeUserId(event.target.value);
	};

	changeTitle = (event) => {
		this.props.changeTitle(event.target.value);
	};

	save = () => {
		const {
			match: {
				params: { us_id, tsk_id }
			},
			tasks,
			user_id,
			title,
			add,
			update
		} = this.props;

		const new_task = {
			userId: user_id,
			title: title,
			completed: false
		};

		if (us_id && tsk_id) {
			const task = tasks[us_id][tsk_id];
			const updated_task = {
				...new_task,
				completed: task.completed,
				id: task.id
			};
			update(updated_task);
		} else {
			add(new_task);
		}
	};

	disable = () => {
		const { user_id, title, loading } = this.props;
		if (loading) {
			return true;
		}
		if (!user_id || !title) {
			return true;
		}
		return false;
	};

	showAction = () => {
		const { error, loading } = this.props;
		if (loading) {
			return <Spinner />;
		}
		if (error) {
			return <Fatal message={error} />;
		}
	};

	render() {
		return (
			<div>
				{this.props.return ? <Redirect to="/tasks" /> : ''}
				<h1>Save Task</h1>
				User id:
				<input
					type="number"
					value={this.props.user_id}
					onChange={this.changeUserId}
				/>
				<br />
				<br />
				Title:
				<input value={this.props.title} onChange={this.changeTitle} />
				<br />
				<br />
				<button disabled={this.disable()} onClick={this.save}>
					Save
				</button>
				{this.showAction()}
			</div>
		);
	}
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(
	mapStateToProps,
	tasksActions
)(Save);
