import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListView from './components/ListView/index'
import Nav from './components/Nav';

function Routes() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/list-view" component={ListView} />
        </Switch>
        <Nav />
      </div>
    </Router>
  );
}

export default Routes;
