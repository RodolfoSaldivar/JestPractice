import React from 'react';
import { shallow } from 'enzyme';
import fixtures from '../../fixtures/users';
import { Users } from '../../../components/Users';
import UsersTable from '../../../components/Users/UsersTable';
import * as usersActions from '../../../actions/usersActions';

const PROPS = {
	...fixtures.initial_state,
	...usersActions
};

describe('<Users />', () => {
	it('Renders correctly', () => {
		const users = shallow(<Users {...PROPS} />);
		expect(users).toMatchSnapshot();
	});

	it('Displays <UsersTable />', () => {
		const users = shallow(<Users {...PROPS} users={fixtures.one_user} />);
		expect(users).toMatchSnapshot();
		expect(users.find(UsersTable).exists()).toBe(true);
	});

	it('Displays <Spinner />', () => {
		const users = shallow(<Users {...PROPS} loading />);
		expect(users).toMatchSnapshot();
		expect(users.find('Spinner').exists()).toBe(true);
	});

	it('Displays <Fatal />', () => {
		const users = shallow(<Users {...PROPS} error="error" />);
		expect(users).toMatchSnapshot();
		expect(users.find('Fatal').exists()).toBe(true);
	});
});
