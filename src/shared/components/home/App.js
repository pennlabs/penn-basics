import React, { Component } from 'react'
import axios from 'axios'
import s from 'styled-components'
import dateFormat from 'dateformat'


import Dining from './Dining'
import Laundry from './Laundry'
import Studyspaces from './Studyspaces'
import Notification from './Notification'
import Events from './Events'
import { BorderedCard } from '../shared'
import Footer from '../footer'


const Wrapper = s.div`
  padding: 1rem;
`

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      notification: '',
      dining: false,
      quotes: null,
    }

    this.close = this.close.bind(this)
  }


  componentDidMount() {
    // TODO reduxify this
    axios.get(`/api/events/${Date.now()}`)
      .then((resp) => {
        if (resp.data.events.length === 0) {
          this.setState({ show: false })
        } else {
          this.setState({
            show: true,
            notification: resp.data.events[0].event,
          })
        }
      })
      .catch((err) => {
        // TODO better error handling

        console.log(err) // eslint-disable-line
      })

    // TODO reduxify this
    axios.get('/api/quotes')
      .then((res) => {
        this.setState({ quotes: res.data })
      }).catch((err) => {
        // TODO better error handling

        console.log(err) // eslint-disable-line
      })
  }


  close() {
    this.setState({ show: false })
  }


  render() {
    // TODO less bulma madness
    const {
      dining,
      show,
      notification,
      quotes,
    } = this.state

    if (!quotes) return null

    const { quote, author } = quotes[Math.floor(Math.random() * quotes.length)]

    return (
      <Wrapper>
        {show && (<Notification show={this.close} text={notification} />)}

        <BorderedCard>
          <h1 className="title is-4">{dateFormat(new Date(), "dddd, mmmm dS")}</h1>
          <a class="weatherwidget-io" href="https://forecast7.com/en/39d95n75d17/philadelphia/?unit=us" data-label_1="PHILADELPHIA" data-days="3" data-theme="pure" >PHILADELPHIA WEATHER</a>
          <div className="content is-medium" style={{ marginTop: "3%" }}>
            <p className="has-text-centered">
              {`"${quote}"`}
            </p>
            <p className="has-text-right">
              {`--- ${author}`}
            </p>
          </div>
        </BorderedCard>

        <Events />

        <Laundry />

        <Dining show={dining} />

        <Studyspaces />

        <Footer />
      </Wrapper>
    )
  }
}


export default Home
