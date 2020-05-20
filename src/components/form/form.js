import React from 'react';
import { Button } from 'antd';

import { millisecondsDevider, secondsDevider, minutesDevider } from '../../utils/utils';

class Form extends React.Component {
  state = {
    isPaused: true,
    startTime: Date.now(),
    period: '000',
    elapsedTime: 0,
    isStopped: true,
  };

  onMainButtonClick = () => {
    const { isPaused } = this.state;

    if (isPaused === true) {
      this.poll = setInterval(this.tick, 57);
      this.setState({
        startTime: Date.now(),
        isStopped: false,
      });

      this.setState((prevState) => ({
        period: prevState.period,
      }));
    }

    if (isPaused === false) {
      clearInterval(this.poll);

      this.setState((prevState) => ({
        period: prevState.period,
        elapsedTime: prevState.period,
      }));
    }

    this.setState((prevState) => ({
      isPaused: !prevState.isPaused,
    }));
  };

  onResetClick = () => {
    clearInterval(this.poll);
    this.setState({
      period: '000',
      elapsedTime: 0,
      isStopped: true,
      isPaused: true,
    });
  };

  tick = () => {
    this.setState((prevState) => ({
      period: prevState.elapsedTime + (Date.now() - prevState.startTime),
    }));
  };

  render() {
    const { isPaused, period, isStopped } = this.state;

    const mainButtonLabel = isPaused ? 'Start' : 'Pause';
    const milliseconds = millisecondsDevider(period);
    const seconds = secondsDevider(period);
    const minutes = minutesDevider(period);
    const resetButton = (
      <Button
        shape="round"
        size="large"
        type="primary"
        onClick={this.onResetClick}
        className="button"
      >
        Reset
      </Button>
    );

    return (
      <div className="timer-container">
        <div className="display">
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
          <span>
            :
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
          <span>
            :
            {milliseconds.length < 3 ? `0${milliseconds}` : milliseconds}
          </span>
        </div>
        <div className="buttons">
          <Button
            shape="round"
            size="large"
            type="primary"
            onClick={this.onMainButtonClick}
            className="button"
          >
            {mainButtonLabel}
          </Button>

          {isStopped ? null : resetButton}
        </div>
      </div>
    );
  }
}

export default Form;
