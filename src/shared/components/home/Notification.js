import React from 'react'
import PropTypes from 'prop-types'


// TODO wat
const Notification = ({
  show,
  text,
}) => (
  <div className="notification is-info">
    <button type="button" className="delete" onClick={show} />

    <p style={{ textAlign: 'center' }}>
      { "⚡ It's currently ~~lit o'clock~~ " }
      <strong>
        {text}
      </strong>
      {'⚡'}
    </p>
  </div>
)


Notification.propTypes = {
  show: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}


export default Notification;
