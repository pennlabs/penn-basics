import React, { Component } from 'react'
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

class Quotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      greeting: '',
      quote: '',
      author: '',
    }
  }

  componentDidMount() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    const greeting = greetings[Math.floor(Math.random() * greetings.length)]
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    this.setState({ ...quote, greeting: `${greeting} ${emoji}` })
  }

  render() {
    const { quote, author, greeting } = this.state
    return (
      <>
        <h1 className="title is-4">{greeting}</h1>
        <div className="content is-medium" style={{ marginTop: '0.5rem' }}>
          <p className="has-text-centered">{`"${quote}"`}</p>
          <Author className="has-text-right">
            &#8212;
            {` `}
            {author}
          </Author>
        </div>
      </>
    )
  }
}

export default Quotes
