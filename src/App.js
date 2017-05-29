import React, { Component } from 'react';
import './App.css';

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
      intervalID: null
    }
    this.tick = this.tick.bind(this);
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

  render() {
    return (
      <div className="App">
        <Clock 
          time={this.state.datetime}
          className="clock"
        />
      </div>
    );
  }
}

export default App;
