import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import * as types from '../../types/usersTypes';
import * as actions from '../../actions/usersActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
var axiosMock = new MockAdapter(axios);

describe('Users Actions', () => {
   //================================================

   describe('getAll', () => {
      afterEach(() => axiosMock.reset());

      const GET_URL = 'https://jsonplaceholder.typicode.com/users';

      it('Success', async () => {
         axiosMock.onGet(GET_URL).reply(200, [{ id: 1 }]);

         const expectedActions = [
            { type: types.LOADING },
            { type: types.GET_ALL, payload: [{ id: 1 }] }
         ];

         const store = mockStore({ users: [] });
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

         const store = mockStore({});
         await store.dispatch(actions.getAll());
         expect(store.getActions()).toEqual(expectedActions);
      });
   });
});
