// 23280666790380

import axios from 'axios';
import reduxThunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import * as types from '../../types/usersTypes';
import * as actions from '../../actions/usersActions';

const mockStore = configureMockStore([reduxThunk]);
var axiosMock = new MockAdapter(axios);

describe('Users Actions', () => {
   afterEach(() => axiosMock.reset());

   describe('getAll', () => {
      const GET_URL = 'https://jsonplaceholder.typicode.com/users';

      it('Success', async () => {
         axiosMock.onGet(GET_URL).reply(200, [{ id: 1 }]);

         const expectedActions = [
            { type: types.LOADING },
            { type: types.GET_ALL, payload: [{ id: 1 }] }
         ];

         const store = mockStore();
         await store.dispatch(actions.getAll());
         expect(store.getActions()).toEqual(expectedActions);
      });

      it('Error', async () => {
         axiosMock.onGet(GET_URL).networkError();

         const expectedActions = [
            { type: types.LOADING },
            {
               type: types.ERROR,
               payload: 'Try later.'
            }
         ];

         const store = mockStore();
         await store.dispatch(actions.getAll());
         expect(store.getActions()).toEqual(expectedActions);
      });
   });
});
