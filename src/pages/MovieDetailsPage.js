import React, { Component } from 'react';
import MoviesPreview from '../components/MoviesPreview';
import moviesApi from '../services/movies-api';
import Loader from '../components/Loader';
import { MovieNav } from '../routes/MovieDetailNavigation';
import ContentNavigation from '../components/Navigation/ContentNavigation';

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
    backdrop_path: null,
    posterSize: null,
  };

  canceled: false;

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const location = this.props.location.state?.from;
    const { pathname } = this.props.location;

    const error =
      pathname !== `/movies/${movieId}` &&
      pathname !== `/movies/${movieId}/cast` &&
      pathname !== `/movies/${movieId}/reviews`;

    if (error) {
      this.backDefaultPages();
    }
    this.setState({
      isLoading: true,
      location,
    });

    this.MovieDetails(movieId);
  }

  MovieDetails = async movieId => {
    if (!Number(movieId)) {
      this.backDefaultPages();
    }

    const data = await moviesApi.getMovieDetails(movieId);
    const {
      title,
      overview,
      genres,
      release_date,
      poster_path,
      backdrop_path,
    } = data;
    !this.canceled &&
      this.setState({
        title,
        overview,
        genres,
        poster_path,
        release_date: release_date.slice(0, 4),
        isLoading: false,
        backdrop_path,
      });

    const { base_url, logo_sizes } = await moviesApi.Configuration();
    !this.canceled &&
      this.setState({
        baseUrl: base_url,
        logoSizes: logo_sizes[4],
        posterSize: logo_sizes[6],
      });
  };

  componentWillUnmount() {
    this.canceled = true;
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.push(this.state?.location || '/');
  };

  backDefaultPages = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { isLoading } = this.state;
    const { url, path } = this.props.match;

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <MoviesPreview
              state={this.state}
              GoBack={this.handleGoBack}
              url={url}
            />
            <ContentNavigation route={MovieNav} url={path} />
          </>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
