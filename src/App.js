import React, { Component } from 'react'
import moment from 'moment'
import ClockDisplay from './ClockDisplay'
import Format from './Format'
//import './App.css';


class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      time: moment(),
      intervalId: null,
      format: 12,
      alarm: null,
      alert: false,
      notify: false
    }
    this.tick = this.tick.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
    // this.setAlarm = this.setAlarm.bind(this);
    // this.removeAlarm = this.removeAlarm.bind(this);
    // this.checkAlarm = this.checkAlarm.bind(this);
    // this.resetAlarm = this.resetAlarm.bind(this);
  }

  componentDidMount() {
    const {time} = this.state
    setTimeout(() => {
      this.tick()
      this.setState({
        intervalId: setInterval(() => {
          this.tick()
        }, 1000)
      })
      
    }, 1000 - time.milliseconds())
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  tick() {
    this.setState(prevState => {
      return {
        time: prevState.time.add(1000)
      }
    })
  }

  changeFormat(format) {
    this.setState({format})
  }

  // checkAlarm(time) {
  //   if (this.state.alarm && !this.state.alert) {
  //     if (time.toTimeString() === this.state.alarm.toTimeString()) {
  //       this.setState({
  //         alert: true
  //       })
        
  //       // notify user
  //       if (this.state.notify) {
  //         const time = this.formatTime(this.state.alarm)
  //         const n = new Notification ("Alarm", {
  //           body: `Your alarm for ${time} has gone off.`
  //         });
  //       }
  //     }
  //   }
  // }

  // setAlarm(event, date) {
  //   // check user for notification permission
  //   if (!this.state.notify) {
  //     Notification.requestPermission().then((result) => {
  //       if (result === 'granted') {
  //         this.setState({
  //           notify: true
  //         });
  //       }
  //     });
  //   }

  //   date.setSeconds(0, 0);
  //   this.setState({alarm: date});
  // }

  // removeAlarm() {
  //   this.setState({alarm: null});
  // }

  // resetAlarm() {
  //   this.setState({
  //     alarm: null,
  //     alert: false
  //   })
  // }

  // formatTime(date) {
  //   const options = {
  //     hour: 'numeric',
  //     minute: 'numeric'
  //   }
  //   return date.toLocaleTimeString([], options);
  // }

  render() {
    const {time, format} = this.state
    return (
      <div>
        <ClockDisplay
          value={time}
          format={format}
        />
        <Format
          value={format}
          onChange={this.changeFormat}
        />
      </div>
    )
  }
}

export default App