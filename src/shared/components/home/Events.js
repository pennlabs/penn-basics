import React, { Component } from 'react'
import axios from 'axios'
import uuid from 'uuid'
import dateFormat from 'dateformat'
import { BorderedCard } from '../shared'

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarArray: null,
    }
  }

  componentDidMount() {
    axios.get('https://api.pennlabs.org/calendar/').then(res => {
      const calendarArray = res.data.calendar
      this.setState({ calendarArray })
    })
  }

  renderCalendarCards() {
    const { calendarArray } = this.state
    return calendarArray.map(event => {
      let startDate = event.start
      const index = startDate.lastIndexOf('-')
      startDate = `${startDate.substring(0, index + 1)}${parseInt(
        startDate.substring(index + 1),
        10
      ) + 1}`
      startDate = dateFormat(startDate, 'dddd, mmmm dS')
      return (
        <article className="media" key={uuid()}>
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://pbs.twimg.com/profile_images/875383884862570496/TN7FoDDx.jpg"
                alt="First"
              />
              />
            </figure>
          </div>
          <div className="spacer-20" />
          <div className="media-content">
            <div className="content">
              <p className="is-size-6">
                <strong>{event.name}</strong>
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

  render() {
    const { calendarArray } = this.state

    return (
      <BorderedCard>
        <h1 className="title is-4">University Calendar</h1>
        <h2 className="subtitle is-6">Events happening in next two weeks</h2>
        {calendarArray && this.renderCalendarCards()}
      </BorderedCard>
    )
  }
}

export default Events
