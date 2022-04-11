import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import './css/feedback.css';
import './css/header.css';

const THREE = 3;

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div className="feedback-color">
        <Header />
        <div className="feedback-form feedback">
          <div className="feedback-assertions-score pt-2">
            <label htmlFor="assertions">
              Assertions:
              <p data-testid="feedback-total-question" id="assertions">{assertions}</p>
            </label>

            <label htmlFor="score">
              Score:
              <p data-testid="feedback-total-score" id="score">{score}</p>
            </label>
            <p data-testid="feedback-text" className="feedback-text py-4">
              {
                assertions >= THREE ? 'Well Done!' : 'Could be better...'
              }
            </p>
          </div>

          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              className="btn-play-again mt-12 bg-blue-500 hover:bg-blue-400
              text-white font-bold
              py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Play Again
            </button>
          </Link>

        </div>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            className="btn-ranking bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Ranking
          </button>
        </Link>
      </div>
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
