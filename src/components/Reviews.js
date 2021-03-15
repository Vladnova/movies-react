import React, { Component } from 'react';
import moviesApi from '../services/movies-api';

class Reviews extends Component {
  state = {
    reviews: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { movieId } = this.props.match.params;

    const reviews = await moviesApi.getMovieRaviews(movieId);
    this.setState({ reviews, isLoading: false });
  }

  render() {
    const { reviews, isLoading } = this.state;
    return (
      <>
        {isLoading && <h1>Loading...</h1>}
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(({ author, content, id }) => (
              <li key={id}>
                <h4>Author: {author}</h4>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h3>We don't have any reviews for this movie.</h3>
        )}
      </>
    );
  }
}

export default Reviews;
