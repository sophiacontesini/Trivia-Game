import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './components/Header';

const THREE = 3;

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Seu Feedback</h1>
        <label htmlFor="assertions">
          Assertions:
          <p data-testid="feedback-total-question" id="assertions">{assertions}</p>
        </label>

        <label htmlFor="score">
          Score:
          <p data-testid="feedback-total-score" id="score">{score}</p>
        </label>

        <p data-testid="feedback-text">
          {
            assertions >= THREE ? 'Well Done!' : 'Could be better...'
          }
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
