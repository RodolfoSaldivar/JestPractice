import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import Users from './Users';
import Posts from './Posts';
import Tasks from './Tasks';
import SaveTasks from './Tasks/Save';

const App = (props) => (
   <BrowserRouter>
      <Menu />
      <div id="margen">
         <Route exact path="/" component={Users} />
         <Route exact path="/tasks" component={Tasks} />
         <Route exact path="/posts/:key" component={Posts} />
         <Route exact path="/tasks/save" component={SaveTasks} />
         <Route exact path="/tasks/save/:us_id/:tsk_id" component={SaveTasks} />
      </div>
   </BrowserRouter>
);

export default App;
