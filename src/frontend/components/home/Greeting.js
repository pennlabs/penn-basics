import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Text } from '../shared'

const greetings = ['Hi There', 'Hey there', 'Howdy']
const emojis = ['😀', '😛', '😗', '🤠']

const Greeting = ({ userInfo = {} }) => {
  const [greeting, setGreeting] = useState('')
  const [emoji, setEmoji] = useState('')

  const { fullName, displayName } = userInfo || {}
  // fullName = fullName ? `, ${fullName}` : ''

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)])
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)])
  }, [])

  return <Text className="title is-4">{`${greeting} ${displayName || fullName} ${emoji}`}</Text>
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

export default connect(mapStateToProps, null)(Greeting)
