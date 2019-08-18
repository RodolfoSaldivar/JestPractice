export default {
   initial_state: {
      tasks: {},
      loading: false,
      error: '',
      user_id: '',
      title: '',
      return: false
   },
   tasks: {
      1: {
         1: {
            completed: false,
            id: 1,
            title: 'delectus aut autem',
            userId: 1
         },
         2: {
            completed: false,
            id: 2,
            title: 'delectus aut',
            userId: 1
         }
      },
      2: {
         21: {
            completed: false,
            id: 21,
            title: 'delectus',
            userId: 2
         },
         22: {
            completed: false,
            id: 22,
            title: 'sdver rtbr',
            userId: 2
         }
      }
   }
};
