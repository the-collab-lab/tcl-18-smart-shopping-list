import React from 'react';
import { checkTokenLocalStorage } from 'lib/localstorage';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({
  component: Component,
  path,
  withoutTokenPath,
  ...rest
}) {
  // Check if we have some token
  const hasToken = checkTokenLocalStorage();
  // Analysis: Which places can we visit? or Maybe, a redirect?
  const analysisRoute = ({ props }) => {
    // Visit or redirect?
    return hasToken ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: withoutTokenPath,
          state: { from: path },
        }}
      />
    );
  };

  return <Route {...rest} render={analysisRoute} />;
}

export default PrivateRoute;
