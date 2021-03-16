import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import MovieDetailsPage from '../../pages/MovieDetailsPage';
import MoviesPage from '../../pages/MoviesPage';
import routes from '../../routes';

const Main = () => {
  return (
    <>
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route path={routes.moviesDetails} component={MovieDetailsPage} />
        <Route path={routes.movies} component={MoviesPage} />
        <Route component={HomePage} />
      </Switch>
    </>
  );
};

export default Main;
