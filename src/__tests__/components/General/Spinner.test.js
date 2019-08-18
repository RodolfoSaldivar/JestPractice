import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../components/General/Spinner';

describe('<Spinner />', () => {
	const spinner = shallow(<Spinner />);

	it('Renders correctly', () => {
		expect(spinner).toMatchSnapshot();
	});

	it('Has correct classes', () => {
		const div = spinner.find({ className: 'lds-ring' });
		expect(div).toHaveLength(1);
	});
});
