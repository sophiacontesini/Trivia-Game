import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import { getTokenAction, updateScoreboardAction } from '../redux/actions';
import './components/play.css';

const ZERO = 0;
const UM = 1;
const DOIS = 2;
const TRES = 3;
const DEZ = 10;

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      borderColor: false,
    };
  }

  componentDidMount = async () => {
    const { token } = this.props;

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();

    if (result.response_code === TRES) {
      this.updateToken();
    }
    this.setState({
      questions: result.results,
      index: 0,
    });
  }

  mountQuestions = (questions) => {
    const { borderColor } = this.state;
    const arrayAnswers = questions.incorrect_answers.map((answers, indexAnswers) => (
      <button
        key={ indexAnswers }
        type="button"
        className={ borderColor && 'wrong-answer' }
        data-testid={ `wrong-answer-${indexAnswers}` }
        onClick={ this.wrongAnswer }
      >
        { answers }
      </button>
    ));
    arrayAnswers.push(
      <button
        key={ arrayAnswers.length }
        type="button"
        className={ borderColor && 'correct-answer' }
        data-testid="correct-answer"
        onClick={ () => this.answerHight(questions.difficulty) }
      >
        { questions.correct_answer }
      </button>,
    );
    const randomAnswers = [];

    const index = () => Math.floor(Math.random() * arrayAnswers.length);
    while (arrayAnswers.length > 0) {
      const randomIndex = index();
      randomAnswers.push(arrayAnswers[randomIndex]);
      arrayAnswers.splice(randomIndex, 1);
    }
    return randomAnswers;
  }

  answerHight = (difficulty) => {
    const { timer } = this.state;
    let difficultyValue = ZERO;
    if (difficulty === 'hard') {
      difficultyValue = TRES;
    } else if (difficulty === 'medium') {
      difficultyValue = DOIS;
    } else if (difficulty === 'easy') {
      difficultyValue = UM;
    }
    this.setState({
      borderColor: true,
    });
    const score = DEZ + (timer.time * difficultyValue);
    this.updateScoreboard(score);
  }

  wrongAnswer = () => {
    this.setState({
      borderColor: true,
    });
  }

  render() {
    const { questions, index } = this.state;
    return (
      <>
        <Header />
        { questions[index] !== undefined
          && (
            <div>
              <p data-testid="question-category">{ questions[index].category}</p>
              <p data-testid="question-text">{ questions[index].question }</p>
              <div data-testid="answer-options">
                { questions[index].type === 'boolean'
                && this.mountQuestions(questions[index]) }

                { questions[index].type === 'multiple'
                && this.mountQuestions(questions[index]) }
              </div>

            </div>
          )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  updateToken: () => dispatch(getTokenAction()),
  updateScoreboard: (score) => dispatch(updateScoreboardAction(score)),
});

Play.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
