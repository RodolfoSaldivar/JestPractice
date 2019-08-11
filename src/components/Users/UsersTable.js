import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Visibility from '@material-ui/icons/Visibility';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';

//================================================

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto'
	},
	table: {
		minWidth: 650
	},
	icon: {
		color: theme.palette.text.primary
	}
}));

//================================================

export const UsersTable = (props) => {
	const classes = useStyles();

	const rows = () =>
		props.users.map((user, key) => (
			<TableRow key={user.id}>
				<TableCell>{user.name}</TableCell>
				<TableCell>{user.email}</TableCell>
				<TableCell>{user.website}</TableCell>
				<TableCell>
					<Link to={`/posts/${key}`}>
						<Visibility className={classes.icon} />
					</Link>
				</TableCell>
			</TableRow>
		));

	return (
		<div>
			<Paper className={classes.root} elevation={3}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Mail</TableCell>
							<TableCell>Link</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{rows()}</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

const mapStateToProps = (reducers) => {
	return reducers.usersReducer;
};

export default connect(mapStateToProps)(UsersTable);
