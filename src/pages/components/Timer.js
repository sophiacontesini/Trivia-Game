import PropTypes from 'prop-types';
import React from 'react';

class Timer extends React.Component {
  render() {
    const { time } = this.props;
    return (
      <p className="w-full flex relative items-center mx-auto px-2 h-20">
        <p className="mr-2">Tempo restante:</p>
        {' '}
        <div className="mr-4">
          {' '}
          { time }
        </div>
        <br />
        <progress value={ time } max="30" />
      </p>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Timer;
