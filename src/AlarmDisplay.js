import React from 'react'

const AlarmDisplay = ({time, message, alert, format, onReset}) => {
  const fmtTime = format === 12 ? time.format('h:mma') : time.format('H:mm')
  if (alert) return (
    <Done
      time={fmtTime}
      message={message}
      onReset={onReset}
    />
  ) 
  else return (
    <Waiting
      time={fmtTime}
      message={message}
      onReset={onReset}
    />
  )
}

const Waiting = ({time, message, onReset}) => (
  <div className="alarm waiting">
    <div>
      {message ? <span>{time}</span> : <span>Alarm is set for {time}.</span>}
      {message ? <span> - {message}</span> : null}
    </div>
    <button onClick={onReset}>cancel</button>
  </div>
)

const Done = ({time, message, onReset}) => (
  <div className="alarm done">
    {message ? <div>{message}</div> : <div>Alarm for {time} has finished.</div>}
    <button
      id="primary-btn"
      onClick={onReset}
    >Done</button>
  </div>
)

// const AlarmDisplay = ({time, message, alert, format, onReset}) => (
//   <div
//     className={alert ? 'alarm done' : 'alarm waiting'}
//   >
//     <div>
//       {format === 12
//         ? <span>{time.format('h:mma')}</span>
//         : <span>{time.format('H:mm')}</span>
//       }
//       {message
//         ? <span> - {message}</span>
//         : null
//       }
//     </div>
//     <Button 
//       alert={alert}
//       onReset={onReset}
//     />
//   </div>
// )

// const Button = ({alert, onReset}) => {
//   if (alert) return (
//     <button id="primary-btn" onClick={onReset}>Done</button>
//   )
//   else return (
//     <button onClick={onReset}>cancel</button>
//   )
// }

export default AlarmDisplay