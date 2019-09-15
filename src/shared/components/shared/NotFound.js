import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// TODO remove imgur jawn

const NotFound = ({
  message = 'It seems like the content you are looking for was either moved or does not exist.',
  title = '404: Content not found',
  url = '/',
  urlText = 'Back to home',
}) => (
  <div className="center-div">
    <img
      className="marg-bot-2"
      src="https://i.imgur.com/PMJ4fDJ.png"
      width="400px"
      alt="not found"
    />

    <h1 className="is-size-3 medium-gray-text">{title}</h1>

    <p>{message}</p>

    <Link to={url} className="btn marg-top-1">
      {urlText}
    </Link>
  </div>
)

NotFound.defaultProps = {
  title: '404: Content not found',
  message:
    'It seems like the content you are looking for was either moved or does not exist.',
  urlText: 'Back to home',
  url: '/',
}

NotFound.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  url: PropTypes.string,
  urlText: PropTypes.string,
}

export default NotFound
