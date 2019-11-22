import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Text } from '../shared'

const greetings = ['Hi There', 'Hey there', 'Howdy']
const emojis = ['😀', '😛', '😗', '🤠']

const Greeting = ({ userInfo = {} }) => {
  let fullName = userInfo ? userInfo.fullName : ''
  fullName = fullName ? `, ${fullName}` : ''
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]
  return <Text className="title is-4">{`${greeting}${fullName} ${emoji}`}</Text>
}

const mapStateToProps = ({ authentication }) => authentication

Greeting.defaultProps = {
  userInfo: {},
}

Greeting.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
  }),
}

export default connect(
  mapStateToProps,
  null
)(Greeting)
