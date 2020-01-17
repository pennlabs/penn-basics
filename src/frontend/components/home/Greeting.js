import React, { useEffect, useState } from 'react'

import { Text } from '../shared'

const greetings = ['Hi There!', 'Hey there', 'Howdy!']
const emojis = ['😀', '😛', '😗', '🤠']

export default () => {
  const [greeting, setGreeting] = useState('')
  const [emoji, setEmoji] = useState('')

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)])
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)])
  }, [])

  return <Text className="title is-4">{`${greeting} ${emoji}`}</Text>
}
