import { lazy } from 'react';

export const HeaderNav = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: lazy(() =>
      import('../pages/HomePage' /* webpackChunkName: "HomePage" */),
    ),
  },
  {
    name: '',
    path: '/movies/:movieId',
    exact: false,
    component: lazy(() =>
      import(
        '../pages/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
      ),
    ),
  },
  {
    name: 'Movies',
    path: '/movies',
    exact: true,
    component: lazy(() =>
      import('../pages/MoviesPage' /* webpackChunkName: "MoviesPage" */),
    ),
  },
];
