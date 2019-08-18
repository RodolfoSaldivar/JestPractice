import React from 'react';
import { shallow } from 'enzyme';
import fixtures from '../../fixtures/posts';
import { Comments } from '../../../components/Posts/Comments';

const PROPS = {
	...fixtures.initial_state,
	comments: []
};

describe('<Comments />', () => {
	it('Renders correctly', () => {
		const comments = shallow(<Comments {...PROPS} />);
		expect(comments).toMatchSnapshot();
	});

	it('Returns <Fatal />', () => {
		const comments = shallow(<Comments {...PROPS} com_error="something" />);
		expect(comments).toMatchSnapshot();
		expect(comments.find('Fatal')).toHaveLength(1);
	});

	it('Returns <Spinner />', () => {
		const comments = shallow(<Comments {...PROPS} com_loading />);
		expect(comments).toMatchSnapshot();
		expect(comments.find('Spinner')).toHaveLength(1);
	});

	it('Returns "ul" with "li"', () => {
		const comments = shallow(
			<Comments {...PROPS} comments={fixtures.comments} />
		);
		expect(comments).toMatchSnapshot();
		expect(comments.find('ul')).toHaveLength(1);
		expect(comments.find('li').exists()).toEqual(true);
	});
});
