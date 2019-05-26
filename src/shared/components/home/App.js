import React, { Component } from 'react'
import axios from 'axios'
import s from 'styled-components'

import Filter from './Filter';
import Weather from './Weather'
import News from './News'
import Dining from './Dining'
import Laundry from './Laundry'
import Studyspaces from './Studyspaces'
import Notification from './Notification'
import Events from './Events'
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
    } = this.state


    return (
      <Wrapper>
        {show && (<Notification show={this.close} text={notification} />)}

        <Filter/>
        
        <Weather/>

        <Events />

        <News />

        <Laundry />

        <Dining show={dining} />

        <Studyspaces />

        <Footer />
      </Wrapper>
    )
  }
}

export default Home
