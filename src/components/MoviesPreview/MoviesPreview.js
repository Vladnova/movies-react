import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { ReactComponent as GoBackIcon } from '../../icons/goBack.svg';
import Navigation from '../Navigation';
import { MovieNav } from '../../routes/MovieDetailNavigation';
import styles from './MoviesPreview.module.css';

const MoviesPreview = ({ state, GoBack, url = '' }) => {
  const {
    title,
    overview,
    genres,
    poster_path,
    release_date,
    baseUrl,
    logoSizes,
    backdrop_path,
    posterSize,
  } = state;
  return (
    <>
      <div
        className={styles.wrap}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.7), rgba(3, 37, 65, 0.7)),url(${baseUrl}${posterSize}${backdrop_path})`,
        }}
      >
        <Button type="button" onClick={GoBack} className={styles.goBackBtn}>
          <GoBackIcon width="40" height="40" />
        </Button>
        <img
          className={styles.img}
          src={`${baseUrl}${logoSizes}${poster_path}`}
          alt={title}
        />
        <div className={styles.inner}>
          <h2 className={styles.titleFilm}>
            {title}: ({release_date})
          </h2>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          {genres.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </div>
      </div>
      <Navigation
        route={MovieNav}
        url={url}
        className={[styles.wrapper, , styles.link]}
        activeClassName={styles.linkActive}
      />
    </>
  );
};

MoviesPreview.propTypes = {
  state: PropTypes.object.isRequired,
  GoBack: PropTypes.func.isRequired,
  url: PropTypes.string,
};

export default MoviesPreview;
