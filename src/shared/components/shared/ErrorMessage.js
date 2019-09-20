import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ message = '' }) => {
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
  message: '',
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
}

export default ErrorMessage
