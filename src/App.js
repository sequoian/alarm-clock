import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
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

  tick() {
    const time = this.state.datetime;
    time.setSeconds(time.getSeconds() + 1);
    this.setState({
      datetime: time
    });
  }

  render() {
    const time = this.state.datetime.toLocaleTimeString()
    return (
      <div className={this.props.className}>
        {time}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock 
          className="clock"
        />
      </div>
    );
  }
}

export default App;
