import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './components/Header';

const THREE = 3;

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    console.log(assertions);
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Seu Feedback</h1>
        <p data-testid="feedback-text">
          {
            assertions >= THREE ? 'Well Done!' : 'Could be better...'
          }
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Play Again
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  // score: state.score,
});

Feedback.propTypes = {
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
