import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import Loader from '../Loader';

const ContentNavigation = ({ route, url = '' }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {route.map(({ exact, path, component, name }) => {
          if (name === 'DefaultPage') {
            return <Route key={path} component={HomePage} />;
          }
          return (
            <Route
              key={path}
              exact={exact}
              path={`${url}${path}`}
              component={component}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

export default ContentNavigation;
