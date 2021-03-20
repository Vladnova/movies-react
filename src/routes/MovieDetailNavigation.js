import { lazy } from 'react';

export const MovieNav = [
  {
    name: 'Cast',
    path: '/cast',
    exact: false,
    component: lazy(() =>
      import('../components/MoviesPreview/Cast' /* webpackChunkName: "Cast" */),
    ),
  },
  {
    name: 'Reviews',
    path: '/reviews',
    exact: false,
    component: lazy(() =>
      import(
        '../components/MoviesPreview/Reviews' /* webpackChunkName: "Reviews" */
      ),
    ),
  },
];
