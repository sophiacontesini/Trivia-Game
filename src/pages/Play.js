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

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      borderColor: false,
      timer: {
        id: 0,
        time: 0,
      },
    };
  }

  componentDidMount = async () => {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();

    if (result.response_code === THREE) {
      this.updateToken();
    }
    this.setState({
      questions: result.results,
      index: 0,
    });
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
      if (time === 0) this.disableTimer();
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
      difficultyValue = THREE;
    } else if (difficulty === 'medium') {
      difficultyValue = TWO;
    } else if (difficulty === 'easy') {
      difficultyValue = ONE;
    }
    this.setState({
      borderColor: true,
    });
    const score = TEN + (timer.time * difficultyValue);
    this.updateScoreboard(score);
    this.disableTimer();
  }

  wrongAnswer = () => {
    this.setState({
      borderColor: true,
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
    const { questions, index, timer: { time } } = this.state;
    return (
      <>
        <Header />
        <Timer time={ time } />
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
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.changeQuestion(index) }
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
