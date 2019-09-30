import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const WarningMessage = ({ message = '' }) => {
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

WarningMessage.defaultProps = {
  message: null,
}

WarningMessage.propTypes = {
  message: PropTypes.string,
}
