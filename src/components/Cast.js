import moviesApi from '../services/movies-api';
import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';

class Cast extends Component {
  state = {
    cast: [],
    isLoading: false,
    baseUrl: null,
    logoSizes: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { movieId } = this.props.match.params;

    const { base_url, logo_sizes } = await moviesApi.Configuration();
    this.setState({ baseUrl: base_url, logoSizes: logo_sizes[3] });

    const cast = await moviesApi.getMovieCast(movieId);
    this.setState({ cast, isLoading: false });
  }

  render() {
    const { cast, isLoading, baseUrl, logoSizes } = this.state;
    return (
      <>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <ul>
            {cast.map(({ name, id, character, profile_path }) => (
              <li key={id}>
                <img src={`${baseUrl}${logoSizes}${profile_path}`} alt={name} />
                <h4>{name}</h4>
                <p>Character: {character}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Cast;
