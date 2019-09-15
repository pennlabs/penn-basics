import React from 'react'
import dateFormat from 'dateformat'
import { BorderedCard } from '../shared'

export const Weather = () => {
  return (
    <BorderedCard>
      <h1 className="title is-4">Weather in Philly</h1>
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
    </BorderedCard>
  )
}

export default Weather
