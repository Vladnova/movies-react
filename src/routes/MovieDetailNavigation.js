import { lazy } from 'react';

export const MovieNav = [
  {
    name: 'Cast',
    path: '/cast',
    exact: true,
    component: lazy(() =>
      import('../components/MoviesPreview/Cast' /* webpackChunkName: "Cast" */),
    ),
  },
  {
    name: 'Reviews',
    path: '/reviews',
    exact: true,
    component: lazy(() =>
      import(
        '../components/MoviesPreview/Reviews' /* webpackChunkName: "Reviews" */
      ),
    ),
  },
];
