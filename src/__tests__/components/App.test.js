import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';
import Users from '../../components/Users';
import Posts from '../../components/Posts';
import Tasks from '../../components/Tasks';
import SaveTasks from '../../components/Tasks/Save';

describe('<App />', () => {
	const app = shallow(<App />);

	it('Renders correctly', () => {
		expect(app).toMatchSnapshot();
	});

	it('Has a <Menu />', () => {
		expect(app.find('Menu').exists()).toBe(true);
	});

	describe('<BrowserRouter />', () => {
		const br = app.find('BrowserRouter');

		it('Exists', () => {
			expect(br.exists()).toBe(true);
		});

		it('Path "/" to "Users"', () => {
			const path = br.find({ path: '/' });
			expect(path.name()).toEqual('Route');
			expect(path.prop('component')).toEqual(Users);
		});

		it('Path "/tasks" to "Tasks"', () => {
			const path = br.find({ path: '/tasks' });
			expect(path.name()).toEqual('Route');
			expect(path.prop('component')).toEqual(Tasks);
		});

		it('Path "/posts/:key" to "Posts"', () => {
			const path = br.find({ path: '/posts/:key' });
			expect(path.name()).toEqual('Route');
			expect(path.prop('component')).toEqual(Posts);
		});

		it('Path "/tasks/save" to "SaveTasks"', () => {
			const path = br.find({ path: '/tasks/save' });
			expect(path.name()).toEqual('Route');
			expect(path.prop('component')).toEqual(SaveTasks);
		});

		it('Path "/tasks/save/:us_id/:tsk_id" to "SaveTasks"', () => {
			const path = br.find({ path: '/tasks/save/:us_id/:tsk_id' });
			expect(path.name()).toEqual('Route');
			expect(path.prop('component')).toEqual(SaveTasks);
		});
	});
});
