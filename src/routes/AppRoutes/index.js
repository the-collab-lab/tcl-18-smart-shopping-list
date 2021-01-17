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
      <PublicRoute exact path="/" withTokenPath="/list-view" component={Home} />
      <PrivateRoute
        exact
        path="/list-view"
        withoutTokenPath="/"
        component={ListView}
      />
      <PrivateRoute
        exact
        path="/add-item"
        withoutTokenPath="/"
        component={AddItem}
      />
    </Switch>
  );
}

export default AppRoutes;
