import * as types from '../../types/usersTypes';
import reducer from '../../reducers/usersReducer';
import fixtures from '../fixtures/users';

describe('Users Reducer', () => {
   //================================================

   it('INITIAL_STATE', () => {
      expect(reducer(undefined, '')).toEqual(fixtures.initial_state);
   });

   //================================================

   it('GET_ALL', () => {
      expect(
         reducer(fixtures.loading, {
            type: types.GET_ALL,
            payload: fixtures.one_user
         })
      ).toEqual({
         ...fixtures.loading,
         users: fixtures.one_user,
         loading: false,
         error: ''
      });
   });

   //================================================

   it('LOADING', () => {
      expect(
         reducer(fixtures.initial_state, {
            type: types.LOADING
         })
      ).toEqual({
         ...fixtures.initial_state,
         loading: true
      });
   });

   //================================================

   it('ERROR', () => {
      expect(
         reducer(fixtures.loading, {
            type: types.ERROR,
            payload: 'error message'
         })
      ).toEqual({
         ...fixtures.loading,
         loading: false,
         error: 'error message'
      });
   });
});
