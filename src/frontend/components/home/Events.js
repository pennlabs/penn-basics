import React, { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'uuid'
import moment from 'moment'
import { BorderedCard, Title, Subtext } from '../shared'
import { logEvent } from '../../analytics/index'

const GET_EVENTS_ROUTE = 'https://api.pennlabs.org/calendar/'

const getSubtext = ({ length }) => {
  switch (length) {
    case 0:
      return 'No Events happening in next two weeks'
    case 1:
      return '1 Event happening in next two weeks'
    default:
      return `${length} Events happening in next two weeks`
  }
}

const Events = () => {
  const [calendarArray, setCalendar] = useState(null)

  useEffect(() => {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    axios
      .get(GET_EVENTS_ROUTE, { cancelToken: source.token })
      .then(res => setCalendar(res.data.calendar))
  }, [])

  if (!calendarArray) return null

  return (
    <BorderedCard>
      <Title>
        <a
          href="https://almanac.upenn.edu/penn-academic-calendar"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent('external links', 'penn academic calendar')}
        >
          University Calendar
        </a>
      </Title>

      <Subtext>{getSubtext({ length: calendarArray.length })}</Subtext>
      {calendarArray.map(event => {
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
                    Starts from&nbsp;
                    {startDate}
                  </small>
                </p>
              </div>
            </div>
          </article>
        )
      })}
    </BorderedCard>
  )
}

export default Events
