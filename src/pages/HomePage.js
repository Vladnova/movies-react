import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import moviesApi from '../services/movies-api';

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
    this.setState({ baseUrl: base_url, logoSizes: logo_sizes[3] });
  };
  render() {
    const { movies, logoSizes, baseUrl, isLoading } = this.state;
    return (
      <>
        <ul>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id}>
              <NavLink to={`/movies/${id}`}>
                <img src={`${baseUrl}${logoSizes}${poster_path}`} alt={title} />
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {isLoading && <h1>Loading...</h1>}
        {movies.length > 0 && !isLoading && (
          <Button onClick={this.fetchTrendMovies} aria-label="Load More">
            Load More
          </Button>
        )}
      </>
    );
  }
}

export default HomePage;
