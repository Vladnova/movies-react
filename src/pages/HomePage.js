import React, { Component } from 'react';
import Button from '../components/Button/Button';
import moviesApi from '../services/movies-api';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';
import styles from './allStylesPages.module.css';

class HomePage extends Component {
  state = {
    movies: [],
    logoSizes: null,
    baseUrl: null,
    page: 1,
    isLoading: false,
  };

  async componentDidMount() {
    this.fetchTrendMovies();
  }

  fetchTrendMovies = async () => {
    const { page } = this.state;
    this.setState({ isLoading: true });

    const trendingMovies = await moviesApi.getMoviesInTrend(page);
    this.setState(prevState => ({
      movies: [...prevState.movies, ...trendingMovies],
      page: prevState.page + 1,
      isLoading: false,
    }));

    const { base_url, logo_sizes } = await moviesApi.Configuration();
    this.setState({ baseUrl: base_url, logoSizes: logo_sizes[4] });
  };
  render() {
    const { movies, logoSizes, baseUrl, isLoading } = this.state;

    return (
      <>
        <MoviesList
          searchFilm={movies}
          logoSizes={logoSizes}
          baseUrl={baseUrl}
        />

        {isLoading && <Loader/>}
        {movies.length > 0 && !isLoading && (
          <Button  type="button" onClick={this.fetchTrendMovies} className={styles.button}>
            Load More
          </Button>
        )}
      </>
    );
  }
}

export default HomePage;
