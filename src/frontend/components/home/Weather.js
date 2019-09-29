/* global document */
import React from 'react'
import moment from 'moment'
import { BorderedCard, Title } from '../shared'

const Weather = () => {
  const tag = document.createElement('script')
  tag.setAttribute('src', 'https://weatherwidget.io/js/widget.min.js')
  document.getElementsByTagName('body')[0].appendChild(tag)

  return (
    <BorderedCard>
      <Title>Weather in Philly</Title>
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/en/39d95n75d17/philadelphia/"
        data-label_1="Philadelphia"
        data-label_2={moment().format('dddd[,] MMMM Do')}
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
