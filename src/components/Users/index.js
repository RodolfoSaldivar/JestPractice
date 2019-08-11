import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import UsersTable from './UsersTable';

import * as usersActions from '../../actions/usersActions';

export class Users extends Component {
	componentDidMount() {
		if (!this.props.users.length) {
			console.log('this.props.users: ', this.props.users);
			this.props.getAll();
			console.log('after getAll()');
		}
	}

	content = () => {
		if (this.props.loading) {
			return <Spinner />;
		}

		if (this.props.error) {
			return <Fatal message={this.props.error} />;
		}

		return <UsersTable />;
	};

	render() {
		return (
			<div>
				<h1>Users</h1>
				{this.content()}
			</div>
		);
	}
}

const mapStateToProps = (reducers) => {
	return reducers.usersReducer;
};

export default connect(
	mapStateToProps,
	usersActions
)(Users);
