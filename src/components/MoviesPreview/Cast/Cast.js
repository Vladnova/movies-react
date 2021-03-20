import moviesApi from '../../../services/movies-api';
import React, { Component } from 'react';
import Loader from '../../Loader';
import defaulActorImg from '../../../defaultImg/defaulActorImg.jpg';

class Cast extends Component {
  state = {
    cast: [],
    isLoading: false,
    baseUrl: null,
    logoSizes: null,
  };

  canceled: false;

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { movieId } = this.props.match.params;

    const { base_url, logo_sizes } = await moviesApi.Configuration();
    !this.canceled &&
      this.setState({ baseUrl: base_url, logoSizes: logo_sizes[3] });

    const cast = await moviesApi.getMovieCast(movieId);
    !this.canceled && this.setState({ cast, isLoading: false });
  }

  componentWillUnmount() {
    this.canceled = true;
  }

  render() {
    const { cast, isLoading, baseUrl, logoSizes } = this.state;
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <ul>
            {cast &&
              cast.map(({ name, id, character, profile_path }) => (
                <li key={id}>
                  <img
                    src={
                      profile_path
                        ? `${baseUrl}${logoSizes}${profile_path}`
                        : `${defaulActorImg}`
                    }
                    alt={name}
                  />
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
