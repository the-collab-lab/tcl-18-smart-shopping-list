import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ListView from './components/ListView/index';
import AddItem from './components/AddItem/index';
import Nav from './components/Nav';

function Routes() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list-view" component={ListView} />
          <Route exact path="/add-item" component={AddItem} />
        </Switch>
        <Nav />
      </div>
    </Router>
  );
}

export default Routes;
