import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
  render() {
    return (
      <div className={this.props.className}>
        2:45pm
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
