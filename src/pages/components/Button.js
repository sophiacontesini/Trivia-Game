import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { changeQuestion, currentIndex } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => changeQuestion(currentIndex) }
      >
        <p
          className={ `ml-4 mt-4 flex m-auto bg-blue-400 
          hover:bg-blue-600
          text-gray-800 font-bold py-2 px-4 rounded` }
        >
          Próxima pergunta
        </p>
      </button>
    );
  }
}

Button.propTypes = {
  changeQuestion: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export default Button;
