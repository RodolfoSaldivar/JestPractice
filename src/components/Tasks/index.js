import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as tasksActions from '../../actions/tasksActions';

class Tasks extends Component {
	componentDidMount() {
		if (!Object.keys(this.props.tasks).length) this.props.getAll();
	}

	componentDidUpdate() {
		const { tasks, loading, getAll } = this.props;

		if (!Object.keys(tasks).length && !loading) {
			getAll();
		}
	}

	content = () => {
		const { tasks, loading, error } = this.props;

		if (loading) {
			return <Spinner />;
		}
		if (error) {
			return <Fatal message={error} />;
		}

		return Object.keys(tasks).map((us_id) => (
			<div key={us_id}>
				<h2>User {us_id}</h2>
				<div className="contenedor_tareas">{this.ponerTasks(us_id)}</div>
			</div>
		));
	};

	ponerTasks = (us_id) => {
		const { tasks, checkChange, remove } = this.props;
		const per_user = {
			...tasks[us_id]
		};

		return Object.keys(per_user).map((tsk_id) => (
			<div key={tsk_id}>
				<input
					type="checkbox"
					defaultChecked={per_user[tsk_id].completed}
					onChange={() => checkChange(us_id, tsk_id)}
				/>
				{per_user[tsk_id].title}
				<button className="m_left">
					<Link to={`/tasks/save/${us_id}/${tsk_id}`}>Update</Link>
				</button>
				<button className="m_left" onClick={() => remove(tsk_id)}>
					Remove
				</button>
			</div>
		));
	};

	render() {
		return (
			<div>
				<button>
					<Link to="/tasks/save">Add</Link>
				</button>
				{this.content()}
			</div>
		);
	}
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(
	mapStateToProps,
	tasksActions
)(Tasks);
