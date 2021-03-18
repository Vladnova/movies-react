import React from 'react';
import Button from '../Button/Button';
import styles from './MoviesPreview.module.css';

const MoviesPreview = (state, handleGoBack) => {
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
    <div
      className={styles.wrap}
      style={{
        backgroundImage: `url(${baseUrl}${posterSize}${backdrop_path})`,
        backgroundSize: 'cover',
      }}
    >
      <Button type="button" onClick={handleGoBack}>
        Go back
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
  );
};

export default MoviesPreview;
