import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import { getTokenAction, updateScoreboardAction } from '../redux/actions';
import './components/play.css';
import Timer from './components/Timer';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const FIVE = 5;
const TEN = 10;
const WRONG_ANSWER = 'wrong-answer';
const CORRECT_ANSWER = 'correct-answer';

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      alternatives: [],
      currentIndex: 0,
      isAnswered: false,
      timer: {
        id: 0,
        time: 0,
      },
    };
  }

  componentDidMount = async () => {
    const { token, updateToken } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();

    if (result.response_code === THREE) {
      updateToken();
    }
    this.setState({
      questions: result.results,
      index: 0,
    });
    this.mountRandomQuestions();
    this.enableTimer();
  }

  enableTimer = () => {
    const oneSecond = 1000;
    const id = setInterval(this.changeTime, oneSecond);
    this.setState({
      timer: {
        id,
        time: 30,
      },
    });
  }

  disableTimer = () => {
    const { timer: { id } } = this.state;
    window.clearInterval(id);
  }

  changeTime = () => {
    this.setState(({ timer }) => ({
      timer: {
        ...timer,
        time: (timer.time - 1),
      },
    }), () => {
      const { timer: { time } } = this.state;
      if (time === 0) {
        this.disableTimer();
        this.wrongAnswer();
      }
    });
  }

  mountRandomQuestions = () => {
    const { questions, currentIndex } = this.state;
    const answers = questions[currentIndex].incorrect_answers.map((answer) => ({
      answer,
      isTheCorrect: WRONG_ANSWER,
    }));
    answers.push({
      answer: questions[currentIndex].correct_answer,
      isTheCorrect: CORRECT_ANSWER,
    });
    const randomAnswers = [];
    const index = () => Math.floor(Math.random() * answers.length);
    while (answers.length > 0) {
      const randomIndex = index();
      randomAnswers.push(answers[randomIndex]);
      answers.splice(randomIndex, 1);
    }
    this.setState({
      alternatives: randomAnswers,
    });
  }

  mountQuestions = () => {
    const { alternatives, isAnswered } = this.state;
    const arrayAnswers = alternatives.map(({ answer, isTheCorrect }, indexAnswers) => (
      <button
        key={ indexAnswers }
        type="button"
        className={ isAnswered ? isTheCorrect : null }
        disabled={ isAnswered }
        data-testid={
          isTheCorrect === WRONG_ANSWER
            ? `${WRONG_ANSWER}-${indexAnswers}`
            : CORRECT_ANSWER
        }
        onClick={ isTheCorrect === WRONG_ANSWER ? this.wrongAnswer : this.rightAnswer }
      >
        { answer }
      </button>
    ));

    return arrayAnswers;
  }

  rightAnswer = (difficulty) => {
    const { timer } = this.state;
    let difficultyValue = ZERO;
    if (difficulty === 'hard') {
      difficultyValue = THREE;
    } else if (difficulty === 'medium') {
      difficultyValue = TWO;
    } else if (difficulty === 'easy') {
      difficultyValue = ONE;
    }
    this.setState({
      isAnswered: true,
    });
    const score = TEN + (timer.time * difficultyValue);
    const { updateScoreboard } = this.props;
    updateScoreboard(score);
    this.disableTimer();
  }

  wrongAnswer = () => {
    this.setState({
      isAnswered: true,
    });
    this.disableTimer();
  }

  changeQuestion = (index) => {
    if (index < FIVE) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    }
  }

  render() {
    const { questions, currentIndex, timer: { time } } = this.state;
    return (
      <>
        <Header />
        <Timer time={ time } />
        { questions[currentIndex] !== undefined
          && (
            <div>
              <p data-testid="question-category">{ questions[currentIndex].category}</p>
              <p data-testid="question-text">{ questions[currentIndex].question }</p>
              <div data-testid="answer-options">
                { this.mountQuestions() }
              </div>
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.changeQuestion(currentIndex) }
              >
                Next
              </button>
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
  updateToken: PropTypes.func.isRequired,
  updateScoreboard: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
