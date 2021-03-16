import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import Cast from '../components/Cast';
import MoviesPreview from '../components/MoviesPreview';
import Reviews from '../components/Reviews';
import moviesApi from '../services/movies-api';

class MovieDetailsPage extends Component {
  state = {
    title: null,
    overview: null,
    genres: [],
    poster_path: null,
    release_date: null,
    isLoading: false,
    logoSizes: null,
    baseUrl: null,
    location: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const location = this.props.location.state.from;

    this.setState({
      isLoading: true,
      location,
    });

    const data = await moviesApi.getMovieDetails(movieId);
    const { title, overview, genres, release_date, poster_path } = data;
    this.setState({
      title,
      overview,
      genres,
      poster_path,
      release_date: release_date.slice(0, 4),
      isLoading: false,
    });

    const { base_url, logo_sizes } = await moviesApi.Configuration();
    this.setState({ baseUrl: base_url, logoSizes: logo_sizes[3] });
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.push(this.state.location);
  };

  render() {
    const { isLoading } = this.state;
    const { url, path } = this.props.match;

    return (
      <>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Button type="button" onClick={this.handleGoBack}>
              Go back
            </Button>
            <MoviesPreview {...this.state} />

            <NavLink to={`${url}/cast`}>Cast</NavLink>
            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
          </>
        )}

        <Switch>
          <Route path={`${path}/cast`} component={Cast} />
          <Route path={`${path}/reviews`} component={Reviews} />
        </Switch>
      </>
    );
  }
}

export default MovieDetailsPage;
