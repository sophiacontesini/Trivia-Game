import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  getTokenAction, resetScoreboardAction, updateScoreboardAction
} from '../redux/actions';
import Header from './components/Header';
import Timer from './components/Timer';
import './css/header.css';
import './css/play.css';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;
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
    const { name, history } = this.props;
    if (!name) {
      history.push('/');
    }
    const { token, updateToken, resetScoreboard, config } = this.props;
    const { category, difficulty, type } = config;
    try {
      const parameters = (category ? `&category=${category}` : '')
      + (difficulty ? `&difficulty=${difficulty}` : '')
      + (type ? `&type=${type}` : '');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token + parameters}`);
      const result = await response.json();
      if (result.response_code === THREE) {
        updateToken();
      }
      this.setState({
        questions: result.results,
        currentIndex: 0,
      });
      resetScoreboard();
      this.mountRandomQuestions();
      this.enableTimer();
    } catch (error) {
      console.log(error);
    }
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
    this.setState({ alternatives: randomAnswers });
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
        <p
          className="bg-white alternativa hover:bg-gray-400 text-gray-800 font-semibold
         py-2 px-4 border border-gray-400 rounded shadow"
        >
          { answer }
        </p>
      </button>
    ));

    return arrayAnswers;
  }

  rightAnswer = () => {
    const { timer, questions, currentIndex } = this.state;
    const { difficulty } = questions[currentIndex];
    let difficultyValue = ZERO;
    if (difficulty === 'hard') {
      difficultyValue = THREE;
    } else if (difficulty === 'medium') {
      difficultyValue = TWO;
    } else if (difficulty === 'easy') {
      difficultyValue = ONE;
    }
    this.setState({ isAnswered: true });
    const score = TEN + (timer.time * difficultyValue);
    const { updateScoreboard } = this.props;
    updateScoreboard(score);
    this.disableTimer();
  }

  wrongAnswer = () => {
    this.setState({ isAnswered: true });
    this.disableTimer();
  }

  saveInLocalStore = () => {
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const players = JSON.parse(localStorage.getItem('ranking'));
    if (players !== null) {
      localStorage.setItem('ranking', JSON.stringify([...players, { name, score, picture: `https://www.gravatar.com/avatar/${hash}` }]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([{ name, score, picture: `https://www.gravatar.com/avatar/${hash}` }]));
    }
  }

  changeQuestion = (index) => {
    const { history } = this.props;
    if (index === FOUR) {
      this.saveInLocalStore();
      history.push('/feedback');
    }
    if (index < FIVE) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
        isAnswered: false,
      }), () => {
        this.mountRandomQuestions();
        this.enableTimer();
      });
    }
  }

  render() {
    const { questions, currentIndex, timer: { time }, isAnswered } = this.state;
    return (
      <div className="bg">
        <Timer time={ time } />

        <Header />
        { questions[currentIndex] !== undefined
          && (
            <div className="question-form">
              <div className="category-and-question">
                <p data-testid="question-category" className="categoria">
                  { questions[currentIndex].category}
                </p>
                <div>
                  <p
                    data-testid="question-text"
                    className="actual-question rounded shadow-md"
                  >
                    { questions[currentIndex].question }

                  </p>
                </div>
                <audio id="play" autoPlay>
                  <track kind="captions" />
                  <source src={ require('./css/quizz.mp3') } type="audio/mp3" />

                </audio>

                <div
                  data-testid="answer-options"
                  className=" teste text-white font-bold rounded"
                >
                  { this.mountQuestions() }
                </div>
              </div>
              { isAnswered
                && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ () => this.changeQuestion(currentIndex) }
                  >
                    <p
                      className="ml-4 mt-4 flex m-auto bg-blue-400 hover:bg-blue-600
                     text-gray-800 font-bold py-2 px-4 rounded"
                    >
                      Próxima pergunta
                    </p>
                  </button>
                )}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
  config: state.config,
});

const mapDispatchToProps = (dispatch) => ({
  updateToken: () => dispatch(getTokenAction()),
  updateScoreboard: (score) => dispatch(updateScoreboardAction(score)),
  resetScoreboard: () => dispatch(resetScoreboardAction()),
});

Play.propTypes = {
  token: PropTypes.string.isRequired,
  updateToken: PropTypes.func.isRequired,
  updateScoreboard: PropTypes.func.isRequired,
  resetScoreboard: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  config: PropTypes.shape(
    { category: PropTypes.string, difficulty: PropTypes.string, type: PropTypes.string },
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
