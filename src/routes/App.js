import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import Users from '../containers/Users';
import posts from '../components/Posts/Posts';
import Tasks from "../components/Tasks/Tasks";
import TasksSaving from '../components/Tasks/Save'

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path="/" component={Users} />
      <Route exact path="/tasks" component={Tasks} />
      <Route exact path="/posts/:key" component={posts} />
      <Route exact path="/tasks/save" component={TasksSaving} />
    </div>
  </BrowserRouter>
);

export default App;
