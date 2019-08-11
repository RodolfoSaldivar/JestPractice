import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comments from './Comments';

import * as usersActions from '../../actions/usersActions';
import * as postsActions from '../../actions/postsActions';

const { getAll: usersGetAll } = usersActions;
const { getByUser: postsGetByUser, openClose, getComments } = postsActions;

//================================================

const styles = (theme) => ({
	root: {
		width: '100%'
	}
});

//================================================

export class Posts extends Component {
	async componentDidMount() {
		const {
			usersGetAll,
			match: {
				params: { key }
			},
			postsGetByUser
		} = this.props;

		if (!this.props.usersReducer.users.length) {
			await usersGetAll();
		}
		if (this.props.usersReducer.error) {
			return;
		}
		if (!('posts_key' in this.props.usersReducer.users[key])) {
			await postsGetByUser(key);
		}
	}

	displayUser = () => {
		const {
			match: {
				params: { key }
			},
			usersReducer
		} = this.props;

		if (usersReducer.error) {
			return <Fatal message={usersReducer.error} />;
		}
		if (!usersReducer.users.length || usersReducer.loading) {
			return <Spinner />;
		}

		const name = usersReducer.users[key].name;

		return <h1>Posts of: {name}</h1>;
	};

	displayPosts = () => {
		const {
			usersReducer,
			usersReducer: { users },
			postsReducer,
			postsReducer: { posts },
			match: {
				params: { key }
			}
		} = this.props;

		if (!users.length) return;
		if (usersReducer.error) return;
		if (postsReducer.loading) {
			return <Spinner />;
		}
		if (postsReducer.error) {
			return <Fatal message={postsReducer.error} />;
		}
		if (!posts.length) return;
		if (!('posts_key' in users[key])) return;

		const { posts_key } = users[key];
		return this.showInfo(posts[posts_key], posts_key);
	};

	showInfo = (posts, post_key) =>
		posts.map((post, com_key) => (
			<ExpansionPanel
				key={post.id}
				onClick={() => this.showComments(post_key, com_key, post.comments)}
				elevation={3}
			>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<h2>{post.title}</h2>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div>
						<h3>{post.body}</h3>
						{post.open && <Comments comments={post.comments} />}
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		));

	showComments = (post_key, com_key, comments) => {
		this.props.openClose(post_key, com_key);
		if (!comments.length) {
			this.props.getComments(post_key, com_key);
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				{this.displayUser()}
				<div className={classes.root}>{this.displayPosts()}</div>
			</div>
		);
	}
}

const mapStateToProps = ({ usersReducer, postsReducer }) => {
	return { usersReducer, postsReducer };
};

const mapDispatchToProps = {
	usersGetAll,
	postsGetByUser,
	openClose,
	getComments
};

export default withStyles(styles)(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Posts)
);
