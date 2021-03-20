import moviesApi from '../../../services/movies-api';
import React, { Component } from 'react';
import Loader from '../../Loader';
import defaulActorImg from '../../../defaultImg/defaulActorImg.jpg';
import styles from './Cast.module.css';

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
      this.setState({ baseUrl: base_url, logoSizes: logo_sizes[2] });

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
          <ul className={styles.wrapCast}>
            {cast &&
              cast.map(({ name, id, character, profile_path }) => (
                <li key={id} className={styles.itemCast}>
                  <div className={styles.wrapImg}>
                    <img
                      className={styles.imgCast}
                      src={
                        profile_path
                          ? `${baseUrl}${logoSizes}${profile_path}`
                          : `${defaulActorImg}`
                      }
                      alt={name}
                    />
                  </div>
                  <h4 className={styles.titleName}>{name}</h4>
                  <p className={styles.textCharacter}>Character: {character}</p>
                </li>
              ))}
          </ul>
        )}
      </>
    );
  }
}

export default Cast;
