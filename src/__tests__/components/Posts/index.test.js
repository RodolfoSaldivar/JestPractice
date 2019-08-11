import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import user_fixtures from '../../fixtures/users';
import posts_fixtures from '../../fixtures/posts';
import { Posts } from '../../../components/Posts';
import Comments from '../../../components/Posts/Comments';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';

const PROPS = {
	openClose: jest.fn(),
	getComments: jest.fn(),
	usersGetAll: jest.fn(),
	postsGetByUser: jest.fn(),
	classes: { root: {} },
	match: { params: { key: 0 } },
	usersReducer: user_fixtures.initial_state,
	postsReducer: posts_fixtures.initial_state
};

describe('<Posts />', () => {
	it('Renders correctly', () => {
		const posts = shallow(<Posts {...PROPS} />);
		expect(posts).toMatchSnapshot();
	});

	//================================================

	describe('componentDidMount', () => {
		it('Calls usersGetAll() when there are no users', () => {
			shallow(<Posts {...PROPS} />);
			expect(PROPS.usersGetAll).toHaveBeenCalled();
		});

		it('Calls postsGetByUser() when there is no "posts_key" in the user', () => {
			const usersReducer = {
				...user_fixtures.initial_state,
				users: user_fixtures.one_user
			};
			shallow(<Posts {...PROPS} usersReducer={usersReducer} />);
			expect(PROPS.postsGetByUser).toHaveBeenCalled();
		});
	});

	//================================================

	describe('displayUser', () => {
		it('Returns <Fatal />', () => {
			const usersReducer = {
				...user_fixtures.initial_state,
				error: 'something'
			};
			const posts = shallow(
				<Posts {...PROPS} usersReducer={usersReducer} />
			);
			expect(posts).toMatchSnapshot();
			expect(posts.find('Fatal')).toHaveLength(1);
		});

		it('Returns <Spinner /> when there are no users', () => {
			const usersReducer = {
				...user_fixtures.initial_state,
				asd: true
			};
			const posts = shallow(
				<Posts {...PROPS} usersReducer={usersReducer} />
			);
			expect(posts).toMatchSnapshot();
			expect(posts.find('Spinner')).toHaveLength(1);
		});

		it('Returns <Spinner /> when it is loading', () => {
			const usersReducer = {
				...user_fixtures.initial_state,
				users: user_fixtures.one_user,
				loading: true
			};
			const posts = shallow(
				<Posts {...PROPS} usersReducer={usersReducer} />
			);
			expect(posts).toMatchSnapshot();
			expect(posts.find('Spinner')).toHaveLength(1);
		});

		it('Returns a <h1 />', () => {
			const usersReducer = {
				...user_fixtures.initial_state,
				users: user_fixtures.one_user
			};
			const posts = shallow(
				<Posts {...PROPS} usersReducer={usersReducer} />
			);
			expect(posts).toMatchSnapshot();
			expect(posts.find('h1')).toHaveLength(1);
		});
	});

	//================================================

	describe('displayPosts', () => {
		const USERS_REDUCER = {
			...user_fixtures.initial_state,
			users: user_fixtures.one_user
		};

		it('Returns <Spinner />', () => {
			const postsReducer = {
				...posts_fixtures.initial_state,
				loading: true
			};
			const posts = shallow(
				<Posts
					{...PROPS}
					usersReducer={USERS_REDUCER}
					postsReducer={postsReducer}
				/>
			);
			expect(posts).toMatchSnapshot();
			expect(posts.find('Spinner')).toHaveLength(1);
		});

		it('Returns <Fatal />', () => {
			const postsReducer = {
				...posts_fixtures.initial_state,
				error: 'something'
			};
			const posts = shallow(
				<Posts
					{...PROPS}
					usersReducer={USERS_REDUCER}
					postsReducer={postsReducer}
				/>
			);
			expect(posts).toMatchSnapshot();
			expect(posts.find('Fatal')).toHaveLength(1);
		});

		//================================================

		describe('showInfo', () => {
			// USERS_REDUCER['users'][0]['posts_key'] = 0;
			const usersReducer = fromJS(USERS_REDUCER)
				.setIn(['users', 0, 'posts_key'], 0)
				.toJS();
			const POSTS_REDUCER = {
				...posts_fixtures.initial_state,
				posts: posts_fixtures.one_post
			};
			const posts = shallow(
				<Posts
					{...PROPS}
					usersReducer={usersReducer}
					postsReducer={POSTS_REDUCER}
				/>
			);
			const ep = posts.find(ExpansionPanel);

			it('Displays <ExpansionPanel />', () => {
				expect(posts).toMatchSnapshot();
				expect(ep).toHaveLength(1);
			});

			it('Does not show <Comments />', () => {
				expect(posts).toMatchSnapshot();
				expect(ep.find(Comments)).toHaveLength(0);
			});

			it('<Comments />, openClose(), getComments() after click on <ExpansionPanel />', () => {
				// USERS_REDUCER['users'][0]['posts_key'] = 0;
				const postsReducer = fromJS(POSTS_REDUCER)
					.setIn(['posts', 0, 0, 'open'], true)
					.toJS();
				const pst = shallow(
					<Posts
						{...PROPS}
						usersReducer={usersReducer}
						postsReducer={postsReducer}
					/>
				);
				const ep2 = pst.find(ExpansionPanel);

				expect(pst).toMatchSnapshot();
				ep2.simulate('click');
				expect(PROPS.openClose).toHaveBeenCalled();
				expect(PROPS.getComments).toHaveBeenCalled();
				expect(ep2.find(Comments)).toHaveLength(1);
			});
		});
	});
});
