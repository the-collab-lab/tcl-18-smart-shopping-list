import React from 'react';
import { checkTokenLocalStorage } from 'lib/localstorage';
import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ children, ...rest }) {
  // Check if we have some token
  const hasToken = checkTokenLocalStorage();
  // Analysis: Which places can we visit? or Maybe, a redirect?
  const analysisRoute = ({ location }) => {
    const conditionToRedirect = hasToken && location.pathname === '/';
    // Visit or redirect?
    return conditionToRedirect ? (
      <Redirect
        to={{
          pathname: '/list-view',
          state: { from: location },
        }}
      />
    ) : (
      children
    );
  };

  return <Route {...rest} render={analysisRoute} />;
}

export default PublicRoute;
