import React from 'react';
import { shallow } from 'enzyme';
import Fatal from '../../../components/General/Fatal';

describe('<Fatal />', () => {
	const fatal = shallow(<Fatal />);

	it('Renders correctly', () => {
		expect(fatal).toMatchSnapshot();
	});

	it('Has <h2 /> with correct classes', () => {
		const h2 = fatal.find('h2');
		expect(h2).toHaveLength(1);
		expect(h2.prop('className')).toEqual('center rojo');
	});
});
