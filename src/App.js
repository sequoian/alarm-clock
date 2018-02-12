import React, { Component } from 'react'
import moment from 'moment'
import ClockDisplay from './ClockDisplay'
import Format from './Format'
import AlarmForm from './AlarmForm'
import AlarmDisplay from './AlarmDisplay'
import TimerSound from './TimerSound'
import './App.css';

class App extends Component {
    constructor(props) {
    super(props)
    this.audio = new TimerSound()
    this.state = this.hydrateFromStorage() || {
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

    document.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const btn = document.getElementById('primary-btn')
        if (btn) btn.click()
      }
    })
  }

  componentDidUpdate() {
    localStorage.setItem('alarmstate', JSON.stringify(this.state))
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  hydrateFromStorage() {
    const hydratedState = localStorage.getItem('alarmstate')
    if (!hydratedState) return null
    const parsed = JSON.parse(hydratedState)
    const alarm = parsed.alarm ? moment(parsed.alarm) : null
    return {
      ...parsed,
      time: moment(),
      intervalId: null,
      formError: null,
      alarm: alarm,
      // set alert to true if alarm is past due to avoid unnecessary timer sound
      alert: (alarm && moment().subtract(1000 * 60 * 5) > alarm ) ? true : parsed.alert
    }
  }

  tick() {
    const now = moment()
    this.setState({
      time: now
    })
    const {alarm, alert} = this.state
    if (alarm && !alert) this.checkAlarm(now)
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
    this.formatTime()
    const alarm = moment(timeInput, [
      'h:mma',
      'hmma',
      'H:mm',
      'Hmm'
    ])
    if (!alarm.isValid()) return this.setState({
      formError: 'Not a valid time'
    })
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
    this.audio.stop()
    this.setState({
      alarm: null,
      alert: false 
    })
  }

  checkAlarm(now) {
    const {alarm} = this.state
    if (now >= alarm) {
      this.audio.play()
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
        <div id="display">
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
        </div>
        <Format
          value={format}
          onChange={this.changeFormat}
        />
      </div>
    )
  }
}

export default App