import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';
import { getTokenAction } from '../redux/actions';

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
    };
  }

  componentDidMount = async () => {
    const { token } = this.props;
    if (token.response_code === 0) {
      this.updateToken();
    }
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();

    this.setState({
      questions: result.results,
      index: 0,
    });
  }

  mountBooleanQuestions = () => (
    <div>
      <label htmlFor="true">
        TRUE
        <input type="radio" name="alternative" id="true" />
      </label>

      <label htmlFor="false">
        FALSE
        <input type="radio" name="alternative" id="false" />
      </label>
    </div>
  )

  mountMultipleQuestions = (questions) => (
    <div data-testid="answer-options">
      { questions.incorrect_answers.map((answers, indexAnswers) => (
        <label htmlFor="alternative" key={ indexAnswers }>
          { answers }
          <input
            type="radio"
            name="alternative"
            data-testid={ `wrong-answer-${indexAnswers}` }
          />
        </label>
      )) }
      <label htmlFor="alternative">
        { questions.correct_answer }
        <input type="radio" name="alternative" data-testid="correct-answer" />
      </label>
    </div>
  )

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

              { questions[index].type === 'boolean' && this.mountBooleanQuestions() }

              { questions[index].type === 'multiple'
              && this.mountMultipleQuestions(questions[index]) }
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
});

Play.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
