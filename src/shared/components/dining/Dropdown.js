import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Dropdown extends Component {
  constructor(props) {
    super(props)

    const { selected } = this.props
    this.state = { selected }

    // Bind this to helper functions
    this.handleChangeState = this.handleChangeState.bind(this)
  }


  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    const { callback } = this.props

    if (prevState.selected !== selected && callback) {
      callback(selected)
    }
  }


  handleChangeState(event) {
    this.setState({
      selected: event.target.value,
    })
  }


  render() {
    const { values, options } = this.props
    const { selected } = this.state

    const content = values.map((value, index) => {
      // Find the text for the dropdown option
      // NOTE that this is different from the value
      let text = '';

      if (options && options.length > index) {
        text = options[index]
      } else {
        text = value
      }

      return (
        <option key={value} value={value} defaultValue={value === selected}>
          { text }
        </option>
      )
    })

    return (
      <div className="select">
        <select
          className="dropdown"
          id="meal"
          onChange={this.handleChangeState}
          value={selected}
        >
          { content }
        </select>
      </div>
    )
  }
}


Dropdown.defaultProps = {
  callback: () => {},
}


Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  callback: PropTypes.func,
}


export default Dropdown;
