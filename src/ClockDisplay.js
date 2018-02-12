import React from 'react'

const ClockDisplay = ({value, format}) => {
  let h = value.hour()
  const m = value.minute().toString().padStart(2, '0')
  const s = value.second().toString().padStart(2, '0')
  let period = null
  if (format === 12) {
    period = h < 12 ? 'am' : 'pm'
    h = h % 12
    if (h === 0) h = 12
  }
  return (
    <div id="display">
      <span>{h}</span>
      <span>:</span>
      <span>{m}</span>
      <span className={format === 12 ? 'sub-info si12' : 'sub-info si24'}>
        <span>{s}</span>
        {format === 12 ?
          <span>{period}</span>
          : null
        }
      </span>
    </div>
  )
}

export default ClockDisplay