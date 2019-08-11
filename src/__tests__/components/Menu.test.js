import React from 'react';
import { shallow } from 'enzyme';
import Menu from '../../components/Menu';

describe('<Menu />', () => {
	const menu = shallow(<Menu />);

	it('Renders correctly', () => {
		expect(menu).toMatchSnapshot();
	});

	describe('<nav />', () => {
		const nav = menu.find('nav');

		it('Exists', () => {
			expect(nav.exists()).toBe(true);
		});

		it('First <Link /> to "/"', () => {
			const link = nav.childAt(0);
			expect(link.name()).toEqual('Link');
			expect(link.prop('to')).toEqual('/');
		});

		it('Second <Link /> to "/tasks"', () => {
			const link = nav.childAt(1);
			expect(link.name()).toEqual('Link');
			expect(link.prop('to')).toEqual('/tasks');
		});
	});
});
