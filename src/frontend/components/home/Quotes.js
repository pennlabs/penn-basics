import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import quotes from '../../../server/resources/home/homepage_quotes.json'

const Author = s.p`
    font-size: 80%;
    opacity: 0.75;
    font-style: italic;
`

const greetings = [
  'Hi There!',
  'How Are You Doing?',
  "Yo, What's Up?",
  'Howdy!',
]

const emojis = ['😀', '😛', '😗', '🤠']

const Quotes = () => {
  const [greetingState, setGreeting] = useState('')
  const [quoteState, setQuote] = useState('')
  const [authorState, setAuthor] = useState('')

  useEffect(() => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    const greeting = greetings[Math.floor(Math.random() * greetings.length)]
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    setGreeting(`${greeting} ${emoji}`)
    setQuote(quote.quote)
    setAuthor(quote.author)
  }, [])

  return (
    <>
      <h1 className="title is-4">{greetingState}</h1>
      <div className="content is-medium" style={{ marginTop: '0.5rem' }}>
        <p className="has-text-centered">{`"${quoteState}"`}</p>
        <Author className="has-text-right">
          &#8212;
          {` `}
          {authorState}
        </Author>
      </div>
    </>
  )
}

export default Quotes
