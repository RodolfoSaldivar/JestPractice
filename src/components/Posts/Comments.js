import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

export const Comments = (props) => {
	if (props.com_error) {
		return <Fatal message={props.com_error} />;
	}
	if (props.com_loading && !props.comments.length) {
		return <Spinner />;
	}

	const displayComments = () =>
		props.comments.map((comment) => (
			<li key={comment.id}>
				<b>
					<u>{comment.email}</u>
				</b>
				<br />
				{comment.body}
			</li>
		));

	return <ul>{displayComments()}</ul>;
};

const mapStateToProps = ({ postsReducer }) => postsReducer;

export default connect(mapStateToProps)(Comments);
