import React, { useState } from 'react'

interface IErrorMessageProps {
  message?: string
}

export const ErrorMessage = ({ message = '' }: IErrorMessageProps) => {
  const [visible, setVisibility] = useState<boolean>(true)
  if (!message || !visible) return null

  return (
    <div className="notification is-danger">
      <button
        className="delete"
        type="button"
        onClick={() => setVisibility(false)}
      />

      {message || 'Oops, there was an error'}
    </div>
  )
}
