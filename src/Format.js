import React from 'react'

const Format = ({value, onChange}) => (
  <div>
    <Button
      isActive={value === 12}
      onClick={e => onChange(12)}
    >
      12hr
    </Button>
    <Button
      isActive={value === 24}
      onClick={e => onChange(24)}
    >
      24hr
    </Button>
  </div>
)

const Button = ({isActive, onClick, children}) => {
  if (isActive) return <span>{children}</span>
  else return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default Format