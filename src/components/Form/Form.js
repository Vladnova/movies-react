import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

class Form extends Component {
  state = {
    nameMovie: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { nameMovie } = this.state;
    e.preventDefault();
    this.setState({ invisible: false });
    this.props.onSubmit(nameMovie);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ nameMovie: '' });
  };

  render() {
    const { nameMovie } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <input
            type="text"
            name="nameMovie"
            value={nameMovie}
            onChange={this.handleChange}
            className={styles.input}
          />
          {nameMovie && (
            <button type="submit" className={styles.buttonForm}>
              Search
            </button>
          )}
        </form>
      </>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
