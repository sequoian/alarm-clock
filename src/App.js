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

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      datetime: null,
      intervalID: null,
      alarm: null
    }
    this.tick = this.tick.bind(this);
    this.setAlarm = this.setAlarm.bind(this);
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

  render() {
    let controls = null;
    if (!this.state.alarm) {
      controls = (
        <MuiThemeProvider>
          <TimerPicker
            hintText="Add Alarm"
            onChange={this.setAlarm}
          />
        </MuiThemeProvider>
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
