import React from 'react'

const AlarmForm = ({time, message, onChange, onSubmit, error, onBlur}) => (
  <form>
    <span>{error}</span>
    <input
      type="text"
      name="timeInput"
      placeholder="Time"
      value={time}
      onChange={onChange}
      onBlur={() => onBlur()}
    />
    <input
      type="text"
      name="messageInput"
      placeholder="Message (optional)"
      value={message}
      onChange={onChange}
    />
    <button
      type="button"
      onClick={onSubmit}
    >Set Alarm</button>
  </form>
)

export default AlarmForm