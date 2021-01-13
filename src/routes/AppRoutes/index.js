import React from 'react';
import { Switch } from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom';
import ListView from 'components/ListView';
import AddItem from 'components/AddItem';
import CounterList from 'components/counterList';
import Home from 'pages/Home';
import PublicRoute from 'routes/PublicRoute';
import PrivateRoute from 'routes/PrivateRoute';

function AppRoutes() {
  return (
    <Switch>
      <PublicRoute exact path="/">
        <Home />
      </PublicRoute>
      <PrivateRoute exact path="/list-view">
        <ListView />
      </PrivateRoute>
      <PrivateRoute exact path="/add-item">
        <AddItem />
      </PrivateRoute>
      <PrivateRoute exact path="/counter">
        <CounterList />
      </PrivateRoute>
    </Switch>
  );
}

export default AppRoutes;
