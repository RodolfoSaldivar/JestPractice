import React from 'react';
import { shallow } from 'enzyme';
import fixtures from '../../fixtures/tasks';
import { Save } from '../../../components/Tasks/Save';

const PROPS = {
	add: jest.fn(),
	update: jest.fn(),
	clearForm: jest.fn(),
	changeTitle: jest.fn(),
	changeUserId: jest.fn(),
	match: { params: { us_id: undefined, tsk_id: undefined } },
	...fixtures.initial_state
};

describe('<SaveTasks />', () => {
	it('Renders correctly', () => {
		const save = shallow(<Save {...PROPS} />);
		expect(save).toMatchSnapshot();
	});

	it('Renders with empty inputs', () => {
		const save = shallow(<Save {...PROPS} />);
		const inputs = save.find('input');
		expect(save).toMatchSnapshot();
		expect(inputs.at(0).prop('value')).toEqual('');
		expect(inputs.at(1).prop('value')).toEqual('');
	});

	it('Renders with filled inputs', () => {
		const save = shallow(<Save {...PROPS} user_id={123} title="Something" />);
		const inputs = save.find('input');
		expect(save).toMatchSnapshot();
		expect(inputs.at(0).prop('value')).toEqual(123);
		expect(inputs.at(1).prop('value')).toEqual('Something');
	});

	it('Calls changeUserId() when "user_id" changes', () => {
		const save = shallow(<Save {...PROPS} />);
		const input = save.find('input').at(0);
		input.simulate('change', { target: { value: 789 } });
		expect(PROPS.changeUserId).toHaveBeenCalledWith(789);
	});

	it('Calls changeTitle() when "title" changes', () => {
		const save = shallow(<Save {...PROPS} />);
		const input = save.find('input').at(1);
		input.simulate('change', { target: { value: 'Wrote' } });
		expect(PROPS.changeTitle).toHaveBeenCalledWith('Wrote');
	});

	it('Calls add() when save button is clicked', () => {
		const save = shallow(<Save {...PROPS} user_id={123} title="Something" />);
		save.find('button').simulate('click');
		expect(PROPS.add).toHaveBeenCalledWith({
			userId: 123,
			completed: false,
			title: 'Something'
		});
	});

	it('Calls update() when save button is clicked and parameters are present', () => {
		const props = {
			...PROPS,
			user_id: 123,
			title: 'Something',
			tasks: fixtures.tasks,
			match: { params: { us_id: 1, tsk_id: 2 } }
		};
		const save = shallow(<Save {...props} />);
		save.find('button').simulate('click');
		expect(PROPS.update).toHaveBeenCalledWith({
			id: 2,
			userId: 123,
			completed: false,
			title: 'Something'
		});
	});

	it('Returns <Spinner /> if loading', () => {
		const save = shallow(<Save {...PROPS} loading />);
		expect(save).toMatchSnapshot();
		expect(save.find('Spinner')).toHaveLength(1);
	});

	it('Returns <Fatal /> when there is an error', () => {
		const save = shallow(<Save {...PROPS} error="error" />);
		expect(save).toMatchSnapshot();
		expect(save.find('Fatal')).toHaveLength(1);
	});

	it('Returns <Redirect /> when needed', () => {
		const save = shallow(<Save {...PROPS} return />);
		expect(save).toMatchSnapshot();
		expect(save.find('Redirect')).toHaveLength(1);
	});

	//================================================

	describe('componentDidMount', () => {
		it('Calls clearForm()', () => {
			shallow(<Save {...PROPS} />);
			expect(PROPS.clearForm).toHaveBeenCalled();
		});

		it('Calls changeUserId() and changeTitle()', () => {
			const props = {
				...PROPS,
				tasks: fixtures.tasks,
				match: { params: { us_id: 1, tsk_id: 2 } }
			};
			shallow(<Save {...props} />);
			expect(PROPS.changeTitle).toHaveBeenCalled();
			expect(PROPS.changeUserId).toHaveBeenCalled();
		});
	});
});
