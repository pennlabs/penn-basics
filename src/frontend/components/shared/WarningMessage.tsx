import React, { useState } from 'react'

interface IWarningMessageProps {
  message?: string
}

export const WarningMessage = ({ message }: IWarningMessageProps) => {
  const [visible, setVisibility] = useState(true)
  if (!message || !visible) return null

  return (
    <div className="notification is-warning">
      <button
        className="delete"
        type="button"
        onClick={() => setVisibility(false)}
      />

      {message || 'Oops, there was an error'}
    </div>
  )
}
