import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListView from './components/ListView/index';
import AddItem from './components/AddItem/index';
import CounterList from 'components/counterList';
import Nav from './components/Nav';
import Home from './pages/Home/index'

function Routes() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list-view" component={ListView} />
          <Route exact path="/add-item" component={AddItem} />
          <Route exact path="/counter" component={CounterList} />
        </Switch>
        <Nav />
      </div>
    </Router>
  );
}

export default Routes;
