import React from 'react';
import { shallow } from 'enzyme';
import { UsersTable } from '../../../components/Users/UsersTable';
import fixtures from '../../fixtures/users';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Visibility from '@material-ui/icons/Visibility';

describe('<UsersTable />', () => {
	//================================================

	describe('Without users', () => {
		const table = shallow(<UsersTable users={[]} />);

		it('Renders correctly', () => {
			expect(table).toMatchSnapshot();
		});

		it('Displays only the table head', () => {
			expect(table.find(TableRow)).toHaveLength(1);
		});
	});

	//================================================

	describe('With 1 user', () => {
		const table = shallow(<UsersTable users={fixtures.one_user} />);
		const body = table.find(TableRow).at(1);

		it('Renders correctly', () => {
			expect(table).toMatchSnapshot();
		});

		it('Displays table head and 1 row', () => {
			expect(table.find(TableRow)).toHaveLength(2);
		});

		it('Has 4 columns', () => {
			expect(body.find(TableCell)).toHaveLength(4);
		});

		describe('Last column', () => {
			const last = body.find(TableCell).at(3);

			it('Has a <Link /> with correct url', () => {
				const link = last.find('Link');
				expect(link).toHaveLength(1);
				expect(link.prop('to')).toEqual('/posts/0');
			});

			it('Has a <Visibility /> icon', () => {
				const icon = last.find(Visibility);
				expect(icon.name()).toEqual('VisibilityIcon');
			});
		});
	});
});
