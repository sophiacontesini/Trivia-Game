import React from 'react';
import PropTypes from 'prop-types';
import he from 'he';
import song from '../css/quizz.mp3';

class Questions extends React.Component {
  render() {
    const { questions, currentIndex, mountQuestions } = this.props;
    return (
      <div className="category-and-question">
        <p data-testid="question-category" className="categoria">
          { questions[currentIndex].category}
        </p>
        <div>
          <p
            data-testid="question-text"
            className="actual-question rounded shadow-md"
          >
            { he.decode(questions[currentIndex].question) }
          </p>
        </div>
        <audio id="play" autoPlay>
          <track kind="captions" />
          <source src={ song } type="audio/mp3" />
        </audio>
        <div
          data-testid="answer-options"
          className=" teste font-bold rounded "
        >
          { mountQuestions() }
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf.isRequired,
  currentIndex: PropTypes.number.isRequired,
  mountQuestions: PropTypes.func.isRequired,
};

export default Questions;
