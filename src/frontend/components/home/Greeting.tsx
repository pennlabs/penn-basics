import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Text } from '../shared'

import { IUser, IAuthReducerState } from '../../../types'

const greetings = ['Hi There', 'Hey there', 'Howdy']
const emojis = ['😀', '😛', '😗', '🤠']

interface IGreetingProps {
  userInfo: IUser
}

const Greeting = ({ userInfo }: IGreetingProps): React.ReactElement => {
  const [greeting, setGreeting] = useState<string>('')
  const [emoji, setEmoji] = useState<string>('')

  const { fullName, displayName } = userInfo || {}
  let displayString = ''
  if (fullName || displayName) {
    displayString = `, ${displayName || fullName}`
  }

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)])
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)])
  }, [])

  return (
    <Text className="title is-4">
      {`${greeting}${displayString}! ${emoji}`}
    </Text>
  )
}

const mapStateToProps = ({ authentication }: { authentication: IAuthReducerState }) => {
  const { userInfo } = authentication

  return {
    userInfo
  }
}

export default connect(mapStateToProps)(Greeting)
