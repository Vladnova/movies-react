import React from 'react'
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import MovieDetailsPage from '../../pages/MovieDetailsPage';


const ContentNavigation = ({route, url=''}) => {
    return (
        <Switch>
            {route.map(({exact,path, component, name}) =>
              <Route key={path} exact={exact} path={`${url}${path}`} component={component} /> 
            )}
            {/* <Route component={HomePage} /> */}
            
      </Switch>
    )
}

export default ContentNavigation

