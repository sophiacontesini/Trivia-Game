import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Seu Feedback</h1>
      </>
    );
  }
}

export default connect()(Feedback);
