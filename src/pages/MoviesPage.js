import React, { Component } from 'react';
import Button from '../components/Button/Button';
import Form from '../components/Form/Form';
import Loader from '../components/Loader';
import MoviesList from '../components/MoviesList';
import moviesApi from '../services/movies-api';
import styles from './allStylesPages.module.css';

class MoviesPage extends Component {
  state = {
    searchFilm: [],
    page: 1,
    query: '',
    isLoading: false,
    logoSizes: null,
    baseUrl: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchMovies();
    }
  }

  async componentDidMount() {
    const { queryProps } = this.props.location;

    if (queryProps) {
      this.setState({ query: queryProps });
    }
  }

  onSaveSearch = () => {
    const { history, location } = this.props;
    const { query } = this.state;

    history.push({
      pathname: location.pathname,
      search: `queru=${query}`,
      queryProps: `${query}`,
    });
  };

  onChangeQuery = value => {
    this.setState({
      searchFilm: [],
      query: value,
      page: 1,
    });
  };

  fetchMovies = async () => {
    const { query, page } = this.state;
    const options = { query, page };

    this.setState({ isLoading: true });

    const movies = await moviesApi.searchMovies(options);
    const { base_url, logo_sizes } = await moviesApi.Configuration();
    this.setState({ baseUrl: base_url, logoSizes: logo_sizes[4] });

    this.setState(prevState => ({
      searchFilm: [...prevState.searchFilm, ...movies],
      page: prevState.page + 1,
      isLoading: false,
    }));
    this.onSaveSearch();
  };

  render() {
    const { searchFilm, isLoading, baseUrl, logoSizes } = this.state;

    return (
      <>
        <Form onSubmit={this.onChangeQuery} />
        <MoviesList
          searchFilm={searchFilm}
          logoSizes={logoSizes}
          baseUrl={baseUrl}
        />
        {isLoading && <Loader />}
        {searchFilm.length > 0 && !isLoading && (
          <Button type="button" onClick={this.fetchMovies} className={styles.button}>
            Load More
          </Button>
        )}
      </>
    );
  }
}

export default MoviesPage;
