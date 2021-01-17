import React from 'react';
import { checkTokenLocalStorage } from 'lib/localstorage';
import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ component: Component, path, withTokenPath, ...rest }) {
  // Check if we have some token
  const hasToken = checkTokenLocalStorage();
  // Analysis: Which places can we visit? or Maybe, a redirect?
  const analysisRoute = ({ props }) => {
    const conditionToRedirect = hasToken;
    // Visit or redirect?
    return conditionToRedirect ? (
      <Redirect
        to={{
          pathname: withTokenPath,
          state: { from: path },
        }}
      />
    ) : (
      <Component {...props} />
    );
  };

  return <Route {...rest} render={analysisRoute} />;
}

export default PublicRoute;
