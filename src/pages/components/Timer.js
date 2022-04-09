import PropTypes from 'prop-types';
import React from 'react';
import '../css/timer.css';

class Timer extends React.Component {
  render() {
    const { time } = this.props;
    return (
      <div className="">
        <div className="mr-4 tempo">
          {' '}

          {' '}
          { time }
        </div>
        <br />
        <div><progress className="barra-tempo" value={ time } max="30" /></div>
        <audio autoPlay>
          <track default kind="captions" />
          {' '}
          <source s srcLang="en" rc="horse.ogg" type="audio/ogg" />
          {' '}
        </audio>
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Timer;
