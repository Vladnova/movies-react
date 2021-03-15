import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button/Button';
import Form from '../components/Form/Form';
import moviesApi from '../services/movies-api';

class MoviesPage extends Component {
  state = {
    searchFilm: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchMovies();
    }
  }

  onChangeQuery = value => {
    this.setState({
      searchFilm: [],
      searchQuery: value,
      page: 1,
      logoSizes: null,
      baseUrl: null,
    });
  };

  fetchMovies = async () => {
    const { searchQuery, page } = this.state;
    const options = { searchQuery, page };

    this.setState({ isLoading: true });

    const movies = await moviesApi.searchMovies(options);
    const { base_url, logo_sizes } = await moviesApi.Configuration();
    this.setState({ baseUrl: base_url, logoSizes: logo_sizes[3] });

    this.setState(prevState => ({
      searchFilm: [...prevState.searchFilm, ...movies],
      page: prevState.page + 1,
      isLoading: false,
    }));
  };

  render() {
    const { searchFilm, isLoading, baseUrl, logoSizes } = this.state;
    return (
      <>
        <Form onSubmit={this.onChangeQuery} />

        <ul>
          {searchFilm.map(({ id, title, poster_path }) => (
            <li key={id}>
              <NavLink to={`/movies/${id}`}>
                <img src={`${baseUrl}${logoSizes}${poster_path}`} alt={title} />
                {title}
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {isLoading && <h1>Loading...</h1>}
        {searchFilm.length > 0 && !isLoading && (
          <Button onClick={this.fetchMovies} aria-label="Load More">
            Load More
          </Button>
        )}
      </>
    );
  }
}

export default MoviesPage;
