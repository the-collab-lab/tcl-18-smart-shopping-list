import React from 'react';
import { Switch } from 'react-router-dom';
import ListView from 'components/ListView';
import AddItem from 'components/AddItem';
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
    </Switch>
  );
}

export default AppRoutes;
