import React, { Component } from 'react'
import axios from 'axios'
import { BorderedCard } from '../shared'
import dateFormat from 'dateformat'
import s from 'styled-components'

const Author = s.p`
    font-size: 80%;
    opacity: 0.75;
    font-style: italic;
`

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: null,
      greetings: [
        'Hi There!',
        'How Are You Doing?',
        "Yo, What's Up?",
        'Howdy!',
      ],
      emojis: ['😀', '😛', '😗', '🤠'],
      greeting: '',
      quote: '',
      author: '',
    }
  }

  componentDidMount() {
    // TODO reduxify this
    axios
      .get('/api/quotes')
      .then(res => {
        const quotes = res.data
        const { quote, author } = quotes[
          Math.floor(Math.random() * quotes.length)
        ]
        this.setState({ quote, author })
      })
      .catch(err => {
        // TODO better error handling

        console.log(err) // eslint-disable-line
      })

    const { greetings, emojis } = this.state

    const greeting = greetings[Math.floor(Math.random() * greetings.length)]
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    this.setState({ greeting: `${greeting} ${emoji}` })
  }

  render() {
    const { quote, author, greeting } = this.state

    return (
      <BorderedCard>
        <h1 className="title is-4">{greeting}</h1>
        <h6 className="subtitle is-6">Weather in Philly</h6>
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/en/39d95n75d17/philadelphia/"
          data-label_1="Philadelphia"
          data-label_2={dateFormat(new Date(), 'dddd, mmmm dS')}
          data-days="3"
          data-accent=""
          data-theme="pure"
          data-highcolor=""
          data-lowcolor=""
        >
          Weather in Philly
        </a>
        <div className="content is-medium" style={{ marginTop: '0.5rem' }}>
          <p className="has-text-centered">{`"${quote}"`}</p>
          <Author className="has-text-right">
            &#8212;
            {` `}
            {author}
          </Author>
        </div>
      </BorderedCard>
    )
  }
}

export default Weather
