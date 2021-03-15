import React, { Component } from 'react';

class Form extends Component {
  state = {
    nameMovie: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.nameMovie);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ nameMovie: '' });
  };

  render() {
    const { nameMovie } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="nameMovie"
            value={nameMovie}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}

export default Form;
