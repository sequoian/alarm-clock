import React from 'react'

const Format = ({value, onChange}) => (
  <div id="format">
    <Button
      isActive={value === 12}
      onClick={e => onChange(12)}
    >
      12hr
    </Button>
    <span>|</span>
    <Button
      isActive={value === 24}
      onClick={e => onChange(24)}
    >
      24hr
    </Button>
  </div>
)

const Button = ({isActive, onClick, children}) => {
  if (isActive) return <span className="active">{children}</span>
  else return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default Format