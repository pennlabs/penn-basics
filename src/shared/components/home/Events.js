import React, { Component } from 'react'
import axios from 'axios'
import uuid from 'uuid'
import moment from 'moment'
import { BorderedCard } from '../shared'

const GET_EVENTS_ROUTE = 'https://api.pennlabs.org/calendar/'

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarArray: null,
    }
  }

  componentDidMount() {
    axios.get(GET_EVENTS_ROUTE).then(res => {
      const calendarArray = res.data.calendar
      this.setState({ calendarArray })
    })
  }

  renderCalendarCards() {
    const { calendarArray } = this.state
    return calendarArray.map(event => {
      const { start, name } = event
      const startDate = moment(start).format('dddd[,] MMMM Do')
      return (
        <article className="media" key={uuid()}>
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://pbs.twimg.com/profile_images/875383884862570496/TN7FoDDx.jpg"
                alt="First"
              />
            </figure>
          </div>
          <div className="spacer-20" />
          <div className="media-content">
            <div className="content">
              <p className="is-size-6">
                <strong>{name}</strong>
                <br />
                <small>
                  Starts from
                  {startDate}
                </small>
              </p>
            </div>
          </div>
        </article>
      )
    })
  }

  renderSubtext() {
    const { calendarArray } = this.state
    if (calendarArray.length === 0)
      return 'No Events happening in next two weeks'
    return `${calendarArray.length} Events happening in next two weeks`
  }

  render() {
    const { calendarArray } = this.state

    return (
      <BorderedCard>
        <h1 className="title is-4">University Calendar</h1>
        {calendarArray && (
          <h2 className="subtitle is-6"> {this.renderSubtext()} </h2>
        )}
        {calendarArray && this.renderCalendarCards()}
      </BorderedCard>
    )
  }
}

export default Events
