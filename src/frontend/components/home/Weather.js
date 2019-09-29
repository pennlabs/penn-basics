/* global document */
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import { toggleTemperature } from '../../actions/home_actions'
import { BorderedCard } from '../shared'
import Toggle from '../shared/Toggle'

const tempBASE = 'https://forecast7.com/en/39d95n75d17/philadelphia/'

const Weather = ({ filter, dispatchToggleTemperature }) => {
  const tag = document.createElement('script')
  tag.setAttribute('src', 'https://weatherwidget.io/js/widget.min.js')
  document.getElementsByTagName('body')[0].appendChild(tag)

  return (
    <BorderedCard>
      <h1 className="title is-4">Weather in Philly</h1>
      <a
        className="weatherwidget-io"
        href={filter ? tempBASE : `${tempBASE}?unit=us`}
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
      <Toggle
        filter={filter}
        dispatchFilterAction={dispatchToggleTemperature}
        filterOffText="Farenheit"
        filterOnText="Celsius"
      />
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
