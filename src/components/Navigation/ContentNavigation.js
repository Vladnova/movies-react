import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import Loader from '../Loader';

const ContentNavigation = ({ route, url = '' }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {route.map(({ exact, path, component }) => (
          <Route
            key={path}
            exact={exact}
            path={`${url}${path}`}
            component={component}
          />
        ))}
        {/* <Route component={HomePage} /> */}
      </Switch>
    </Suspense>
  );
};

export default ContentNavigation;
