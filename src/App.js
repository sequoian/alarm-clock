import React, { Component } from 'react'
import moment from 'moment'
import ClockDisplay from './ClockDisplay'
import Format from './Format'
import AlarmForm from './AlarmForm'
import AlarmDisplay from './AlarmDisplay'
//import './App.css';


class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      time: moment(),
      intervalId: null,
      format: 12,
      timeInput: '',
      messageInput: '',
      formError: null,
      alarm: null,
      alert: false,
    }
    this.tick = this.tick.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.setAlarm = this.setAlarm.bind(this)
    this.formatTime = this.formatTime.bind(this)
    this.reset = this.reset.bind(this)
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
    const now = moment()
    this.setState({
      time: now
    })
    if (this.state.alarm) this.checkAlarm(now)
  }

  changeFormat(format) {
    this.setState({format})
    this.formatTime(format)
  }

  updateInput(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  setAlarm() {
    const {timeInput} = this.state
    const alarm = moment(timeInput, [
      'h:mma',
      'hmma',
      'H:mm',
      'Hmm'
    ])
    if (!alarm.isValid()) return
    if (alarm < moment()) alarm.add(1, 'd')
    this.setState({
      alarm
    })
  }

  formatTime(fmt) {
    const {timeInput} = this.state
    const format = fmt || this.state.format
    if (timeInput === '') return
    const time = moment(timeInput, [
      'h:mma',
      'hmma',
      'H:mm',
      'Hmm'
    ])
    if (!time.isValid()) {
      return this.setState({
        formError: 'Not a valid time'
      })
    }
    if (format === 12) {
      return this.setState({
        timeInput: time.format('h:mma'),
        formError: null
      })
    }
    else {
      return this.setState({
        timeInput: time.format('H:mm'),
        formError: null
      })
    }
  }

  reset() {
    this.setState({
      alarm: null,
      alert: false 
    })
  }

  checkAlarm(now) {
    const {alarm} = this.state
    if (now >= alarm) {
      this.setState({
        alert: true
      })
    }
  }

  render() {
    const {time, format, timeInput, messageInput, formError, alarm, alert} = this.state
    return (
      <div>
        <ClockDisplay
          value={time}
          format={format}
        />
        {!alarm
          ? <AlarmForm
              time={timeInput}
              message={messageInput}
              onChange={this.updateInput}
              onSubmit={this.setAlarm}
              error={formError}
              onBlur={this.formatTime}
            />
          : <AlarmDisplay
              time={alarm}
              message={messageInput}
              alert={alert}
              format={format}
              onReset={this.reset}
            />
        }
        
        <Format
          value={format}
          onChange={this.changeFormat}
        />
      </div>
    )
  }
}

export default App