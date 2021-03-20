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
    constantAmountOfMovies: null,
    page: 1,
    query: '',
    isLoading: false,
    logoSizes: null,
    baseUrl: null,
  };

  canceled: false;

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchMovies();
    }
  }

  async componentDidMount() {
    const { pathname } = this.props.location;
    // const { query } = this.state;

    // const error = pathname !== `/movies`;

    // if (error) {
    //   this.backDefaultPages();
    // }
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

  // backDefaultPages = () => {
  //   const { history } = this.props;
  //   history.push('/');
  // };

  fetchMovies = async () => {
    const { query, page } = this.state;
    const options = { query, page };

    this.setState({ isLoading: true });

    const movies = await moviesApi.searchMovies(options);
    const { base_url, logo_sizes } = await moviesApi.Configuration();
    !this.canceled &&
      this.setState({ baseUrl: base_url, logoSizes: logo_sizes[4] });

    !this.canceled &&
      this.setState(prevState => ({
        searchFilm: [...prevState.searchFilm, ...movies],
        page: prevState.page + 1,
        isLoading: false,
        constantAmountOfMovies: [...movies].length,
      }));
    this.onSaveSearch();
  };

  componentWillUnmount() {
    this.canceled = true;
  }

  render() {
    const {
      searchFilm,
      isLoading,
      baseUrl,
      logoSizes,
      constantAmountOfMovies,
    } = this.state;

    const showBtn =
      searchFilm.length > 0 && !isLoading && constantAmountOfMovies > 18;

    return (
      <>
        <Form onSubmit={this.onChangeQuery} />
        <MoviesList
          searchFilm={searchFilm}
          logoSizes={logoSizes}
          baseUrl={baseUrl}
        />
        {isLoading && <Loader />}
        {showBtn && (
          <Button
            type="button"
            onClick={this.fetchMovies}
            className={styles.button}
          >
            Load More
          </Button>
        )}
      </>
    );
  }
}

export default MoviesPage;
