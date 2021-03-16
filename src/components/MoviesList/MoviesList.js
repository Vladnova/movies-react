import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const MoviesList = ({ searchFilm, baseUrl, logoSizes, location }) => (
  <ul>
    {searchFilm.map(({ id, title, poster_path }) => (
      <li key={id}>
        <NavLink
          to={{
            pathname: `movies/${id}`,
            state: {
              from: location,
            },
          }}
        >
          <img src={`${baseUrl}${logoSizes}${poster_path}`} alt={title} />
          {title}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default withRouter(MoviesList);
