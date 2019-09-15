/* global localStorage */
import React, { Component } from 'react'
import axios from 'axios'
import s from 'styled-components'
import { connect } from 'react-redux'

import { Row, Col, ColSpace } from '../shared'
import { maxWidth, PHONE } from '../../styles/sizes'

import Filter from './Filter/Filter'
import Weather from './Weather'
import News from './News'
import Dining from './Dining'
import Laundry from './Laundry'
import Notification from './Notification'
import ExternalLinks from './ExternalLinks'
import Quotes from './Quotes'
import Events from './Events'
import Footer from '../footer'

// TODO abstract away localStorage from components

const HOME_FILTER = 'homeFilter'

const Wrapper = s.div`
  padding-top: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  ${maxWidth(PHONE)} {
    padding: 1rem;
  }
`

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      notification: '',
      dining: false,
      componentList: [],
    }

    this.close = this.close.bind(this)
  }

  componentDidMount() {
    // TODO reduxify this
    axios
      .get(`/api/events/${Date.now()}`)
      .then(resp => {
        if (resp.data.events.length === 0) {
          this.setState({ show: false })
        } else {
          this.setState({
            show: true,
            notification: resp.data.events[0].event,
          })
        }

        const { dining } = this.state

        this.setState({
          componentList: [
            <Quotes />,
            <Weather />,
            <Events />,
            <News />,
            <Laundry />,
            <Dining show={dining} />,
          ],
        })
      })
      .catch(err => {
        // TODO better error handling

        console.log(err) // eslint-disable-line
      })
  }

  close() {
    this.setState({ show: false })
  }

  renderComponents() {
    if (!localStorage.getItem(HOME_FILTER)) {
      return null
    }

    const filter = JSON.parse(localStorage.getItem(HOME_FILTER))
    const { componentList } = this.state

    return filter.map(index => componentList[index])
  }

  render() {
    // TODO less bulma madness
    const { show, notification } = this.state

    return (
      <Wrapper>
        {show && <Notification show={this.close} text={notification} />}

        <Row>
          <Col width="70%">{this.renderComponents()}</Col>
          <ColSpace />
          <Col>
            <ExternalLinks />

            <Filter />
          </Col>
        </Row>

        <Footer />
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ home }) => home

export default connect(
  mapStateToProps,
  null
)(Home)
