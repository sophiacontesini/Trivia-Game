import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  render() {
    const { time } = this.props;
    return (
      <p>
        Tempo restante:
        {' '}
        { time }
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
