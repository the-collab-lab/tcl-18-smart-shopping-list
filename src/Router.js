import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddItem from './components/AddItem';
import Nav from './components/Nav';

function Routes() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/add-item" component={AddItem} />
        </Switch>
        <Nav />
      </div>
    </Router>
  );
}

export default Routes;
