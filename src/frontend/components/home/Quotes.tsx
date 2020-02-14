import React from 'react'
import s from 'styled-components'
import quotes from '../../../server/resources/home/homepage_quotes.json'

const Author = s.p`
  font-size: 80%;
  opacity: 0.75;
  font-style: italic;
`

const Quotes = () => {
  const index = Math.floor(Math.random() * quotes.length)
  const quoteObj = quotes[index]
  const { quote, author } = quoteObj

  return (
    <div
      className="content is-medium"
      style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
    >
      <p className="has-text-centered">{`"${quote}"`}</p>
      <Author className="has-text-right">
        &#8212;
        {` `}
        {author}
      </Author>
    </div>
  )
}

export default Quotes
