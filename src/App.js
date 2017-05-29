import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimerPicker from 'material-ui/TimePicker';
import './App.css';

injectTapEventPlugin();

class Clock extends Component {
  render() {
    const time = this.props.time.toLocaleTimeString()
    return (
      <div className={this.props.className}>
        {time}
      </div>
    );
  }
}

class AlarmDisplay extends Component {
  render() {
    const options = {
      hour: 'numeric',
      minute: 'numeric'
    }
    const time = this.props.alarm.toLocaleTimeString([], options);
    return (
      <div className="alarm-display">
        <div className="message">Alarm is set for {time}</div>
        <div className="delete"
          onClick={this.props.removeAlarm}
        />
      </div>
    );
  }
}

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      datetime: null,
      intervalID: null,
      alarm: null,
      alert: false
    }
    this.tick = this.tick.bind(this);
    this.setAlarm = this.setAlarm.bind(this);
    this.removeAlarm = this.removeAlarm.bind(this);
  }

  componentWillMount() {
    const date = new Date();
    const interval = setInterval(this.tick, 1000);
    this.setState({
      datetime: date,
      intervalID: interval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  tick() {
    const time = this.state.datetime;
    time.setSeconds(time.getSeconds() + 1);
    this.setState({
      datetime: time
    });
  }

  setAlarm(event, date) {
    this.setState({alarm: date});
  }

  removeAlarm() {
    this.setState({alarm: null});
  }

  render() {
    let controls = null;
    if (!this.state.alarm) {
      controls = (
        <MuiThemeProvider>
          <TimerPicker
            hintText="Set Alarm"
            onChange={this.setAlarm}
          />
        </MuiThemeProvider>
      );
    }
    else if (this.state.alarm && !this.state.alert) {
      controls = (
        <AlarmDisplay
          alarm={this.state.alarm}
          removeAlarm={this.removeAlarm}
        />
      );
    }

    return (
      <div className="App">
        <Clock 
          time={this.state.datetime}
          className="clock"
        />
        <div className="controls">
          {controls}
        </div>
      </div>
    );
  }
}

export default App;
