import React, { Component } from 'react';
import moviesApi from '../../../services/movies-api';
import Loader from '../../Loader';
import styles from './Reviews.module.css';

class Reviews extends Component {
  state = {
    reviews: [],
    isLoading: false,
  };

  canceled: false;

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { movieId } = this.props.match.params;

    const reviews = await moviesApi.getMovieRaviews(movieId);
    !this.canceled && this.setState({ reviews, isLoading: false });
  }

  componentWillUnmount() {
    this.canceled = true;
  }

  render() {
    const { reviews, isLoading } = this.state;
    return (
      <div className={styles.wrap}>
        {isLoading && <Loader />}
        {reviews.length !== 0 && (
          <ul>
            {reviews.map(({ author, content, id }) => (
              <li key={id}>
                <h4 className={styles.titleAuthor}>Author: {author}</h4>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && reviews.length === 0 && (
          <h2 className={styles.titleDefault}>
            We don't have any reviews for this movie
          </h2>
        )}
      </div>
    );
  }
}

export default Reviews;
