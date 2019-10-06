/* global document */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import { toggleTemperature } from '../../actions/home_actions'
import { BorderedCard, Title } from '../shared'
import Toggle from '../shared/Toggle'

const TEMP_BASE = 'https://forecast7.com/en/39d95n75d17/philadelphia/'

const Weather = ({ filter, dispatchToggleTemperature }) => {
  useEffect(() => {
    const tag = document.createElement('script')
    tag.setAttribute('src', 'https://weatherwidget.io/js/widget.min.js')
    document.getElementsByTagName('body')[0].appendChild(tag)
  }, [filter])

  return (
    <BorderedCard>
      <Toggle
        filter={filter}
        dispatchFilterAction={dispatchToggleTemperature}
        filterOffText="Fahrenheit"
        filterOnText="Celsius"
      />
      <Title>Weather in Philly</Title>
      <a
        className="weatherwidget-io"
        href={filter ? TEMP_BASE : `${TEMP_BASE}?unit=us`}
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

const mapStateToProps = ({ home }) => {
  const { filterTemperature: filter } = home
  return { filter }
}

const mapDispatchToProps = dispatch => ({
  dispatchToggleTemperature: () => dispatch(toggleTemperature()),
})

Weather.defaultProps = {
  filter: false,
}

Weather.propTypes = {
  filter: PropTypes.bool,
  dispatchToggleTemperature: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather)
