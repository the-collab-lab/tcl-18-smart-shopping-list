import React from 'react';
import { checkTokenLocalStorage } from 'lib/localstorage';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  // Check if we have some token
  const hasToken = checkTokenLocalStorage();
  // Analysis: Which places can we visit? or Maybe, a redirect?
  const analysisRoute = ({ location }) => {
    // Visit or redirect?
    return hasToken ? (
      children
    ) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
    );
  };

  return <Route {...rest} render={analysisRoute} />;
}

export default PrivateRoute;
