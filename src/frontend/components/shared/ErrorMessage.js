import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const ErrorMessage = ({ message = '' }) => {
  const [visible, setVisibility] = useState(true)
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

ErrorMessage.defaultProps = {
  message: null,
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
}
