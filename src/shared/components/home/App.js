import React, { Component } from 'react'
import axios from 'axios'
import s from 'styled-components'
import { connect } from 'react-redux'

import { Row, Col, ColSpace } from '../shared'

import Filter from './Filter/Filter'
import Weather from './Weather'
import News from './News'
import Dining from './Dining'
import Laundry from './Laundry'
import Studyspaces from './Studyspaces'
import Notification from './Notification'
import ExternalLinks from './ExternalLinks'
import Events from './Events'
import Footer from '../footer'

const HOME_FILTER = 'homeFilter'

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

        this.setState({
          componentList: [
            <Weather />,
            <Events />,
            <News />,
            <Laundry />,
            <Dining show={this.state.dining} />,
            <Studyspaces />,
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

        <Filter />

        <Row>
          <Col width="70%">{this.renderComponents()}</Col>
          <ColSpace />
          <Col>
            <ExternalLinks />
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
