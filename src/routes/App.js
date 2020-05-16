import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import Users from '../containers/Users';
import posts from '../components/Posts';

const tasks = () => <div>Tasks</div>;

const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path="/" component={Users} />
      <Route exact path="/tasks" component={tasks} />
      <Route exact path="/posts/:key" component={posts} />
    </div>
  </BrowserRouter>
);

export default App;
