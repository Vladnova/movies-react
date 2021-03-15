import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import moviesApi from '../services/movies-api';

class MovieDetailsPage extends Component {
  state = {
    title: null,
    overview: null,
    genres: [],
    id: null,
    poster_path: null,
    release_date: null,
    isLoading: false,
    logoSizes: null,
    baseUrl: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    this.setState({ isLoading: true });

    const data = await moviesApi.getMovieDetails(movieId);
    const { title, overview, genres, id, release_date, poster_path } = data;
    this.setState({
      title,
      overview,
      genres,
      poster_path,
      id,
      release_date: release_date.slice(0, 4),
      isLoading: false,
    });

    const { base_url, logo_sizes } = await moviesApi.Configuration();
    this.setState({ baseUrl: base_url, logoSizes: logo_sizes[3] });
  }
  render() {
    // .slice(0, 3);
    const {
      title,
      overview,
      genres,
      poster_path,
      release_date,
      id,
      isLoading,
      baseUrl,
      logoSizes,
    } = this.state;

    return (
      <>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>Сторінка про один фільм</h1>
            <img src={`${baseUrl}${logoSizes}${poster_path}`} alt={title} />
            <h2>
              {title}: ({release_date})
            </h2>
            <h3>Overview</h3>
            <p>{overview}</p>
            {genres.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
            <NavLink to={`/movies/${id}/cast`}>Cast</NavLink>
            <NavLink to={`/movies/${id}/reviews`}>Reviews</NavLink>
          </>
        )}

        <Switch>
          <Route path="/movies/:movieId/cast" component={Cast} />
          <Route path="/movies/:movieId/reviews" component={Reviews} />
        </Switch>
      </>
    );
  }
}

export default MovieDetailsPage;
