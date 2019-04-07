import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Section from './Section'


import tagDescriptions from './content/tagDescriptions'
import listOnlyTitles from './content/listOnlyTitles'
import descriptionsOnlyTitles from './content/descriptionsOnlyTitles'


class DiningMenu extends Component {
  constructor(props) {
    super(props)
    this.renderSections = this.renderSections.bind(this)
  }


  renderSections() {
    const { sectionsObj } = this.props

    if (!sectionsObj) return null

    const sectionTitles = Object.keys(sectionsObj)

    return sectionTitles.map((title) => {
      // Check if this section should be a list or not
      // This is dependent on the format of data
      const shouldBeList = Boolean(listOnlyTitles[title])

      const descriptionsOnly = Boolean(descriptionsOnlyTitles[title])

      // Return the section formatted
      return (
        <Section
          title={title}
          items={sectionsObj[title]}
          shouldBeList={shouldBeList}
          descriptionsOnly={descriptionsOnly}
          key={title}
        />
      )
    })
  }


  render() {
    return (
      <div className="menu">
        {this.renderSections()}

        <div className="legend">
          <strong>Legend:</strong>
          {
            tagDescriptions.map(tagDescription => (
              <div className="legend-item" key={tagDescription.className}>
                <span className="tag {tagDescription.className}">{tagDescription.title}</span>
                <br />

                {tagDescription.description}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}


DiningMenu.defaultProps = {
  sectionsObj: null,
}


DiningMenu.propTypes = {
  sectionsObj: PropTypes.shape({
    title: PropTypes.string,
  }),
}


const mapStateToProps = (state) => {
  const {
    diningData,
    dateFormatted,
    meal,
  } = state.dining

  let sectionsObj = null

  if (diningData && dateFormatted && meal && diningData[dateFormatted]) {
    sectionsObj = diningData[dateFormatted][meal]
  }

  return { sectionsObj }
}


export default connect(mapStateToProps)(DiningMenu)
