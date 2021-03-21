import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import DefaultMovieImg from '../../defaultImg/defaultMovieImg.jpg';
import styles from './MoviesList.module.css';

const MoviesList = ({ searchFilm, baseUrl, logoSizes, location }) => (
  <ul className={styles.wrapList}>
    {searchFilm.map(({ id, title, poster_path }) => (
      <li key={id} className={styles.item}>
        <NavLink
          to={{
            pathname: `movies/${id}`,
            state: {
              from: location,
            },
          }}
        >
          <img
            className={styles.img}
            src={
              poster_path
                ? `${baseUrl}${logoSizes}${poster_path}`
                : `${DefaultMovieImg}`
            }
            alt={title}
          />
        </NavLink>
      </li>
    ))}
  </ul>
);

MoviesList.defaultProps = {
  searchFilm: [],
  baseUrl: '',
  logoSizes: '',
};

MoviesList.propTypes = {
  searchFilm: PropTypes.arrayOf(PropTypes.object),
  baseUrl: PropTypes.string,
  logoSizes: PropTypes.string,
  location: PropTypes.object.isRequired,
};

export default withRouter(MoviesList);
