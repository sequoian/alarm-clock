import React from 'react'

const AlarmDisplay = ({time, message, alert, format, onReset}) => (
  <div
    id="display"
    className={alert ? 'waiting' : 'done'}
  >
    {format === 12
      ? <span>{time.format('h:mma')}</span>
      : <span>{time.format('H:mm')}</span>
    }
    {message
      ? <span> - {message}</span>
      : null
    }
    <Button 
      alert={alert}
      onReset={onReset}
    />
  </div>
)

const Button = ({alert, onReset}) => {
  if (alert) return (
    <button onClick={onReset}>Done</button>
  )
  else return (
    <button onClick={onReset}>cancel</button>
  )
}

export default AlarmDisplay