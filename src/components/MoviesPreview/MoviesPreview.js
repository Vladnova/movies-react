import React from 'react';

const MoviesPreview = state => {
  const {
    title,
    overview,
    genres,
    poster_path,
    release_date,
    baseUrl,
    logoSizes,
  } = state;
  return (
    <>
      <img src={`${baseUrl}${logoSizes}${poster_path}`} alt={title} />
      <h2>
        {title}: ({release_date})
      </h2>
      <h3>Overview</h3>
      <p>{overview}</p>
      {genres.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </>
  );
};

export default MoviesPreview;
