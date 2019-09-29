import React from 'react'

import { Text } from '../shared'

const greetings = ['Hi There!', 'Hey there', 'Howdy!']
const emojis = ['😀', '😛', '😗', '🤠']

export default () => {
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]
  return <Text className="title is-4">{`${greeting} ${emoji}`}</Text>
}
