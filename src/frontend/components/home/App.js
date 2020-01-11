import React from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col } from '../shared'
import PennLabsCredit from '../shared/PennLabsCredit'
import { maxWidth, PHONE, TABLET } from '../../styles/sizes'

import Filter from './Filter/Filter'
import Greeting from './Greeting'
import Weather from './Weather'
import News from './News'
import Dining from './Dining'
import Laundry from './Laundry'
import ExternalLinks from './ExternalLinks'
import Quotes from './Quotes'
import Events from './Events'

const Wrapper = s.div`
  padding-top: 1rem;
  padding-left: calc(2rem + 1.25vw);
  padding-right: calc(2rem + 1.25vw);

  ${maxWidth(TABLET)} {
    padding: 1rem;
  }

  ${maxWidth(PHONE)} {
    padding: 0.5rem;
  }
`

const Home = ({ filterList }) => {
  const componentList = [
    <Weather />,
    <Events />,
    <News />,
    // <Laundry />,
    // <Dining />,
    <Quotes />,
  ]

  return (
    <>
      <Wrapper>
        <Row margin="0.5rem">
          <Col sm={12} lg={8} margin="0.5rem">
            <Greeting />
            {filterList.map(filter => componentList[filter])}
          </Col>

          {/* Overflow visible so customize this page filter dropdown works */}
          <Col sm={12} lg={4} style={{ overflow: 'visible' }} margin="0.5rem">
            <ExternalLinks />

            <Filter />
          </Col>
        </Row>
      </Wrapper>
      <Wrapper>
        <PennLabsCredit padding="0 0 1rem 0" />
      </Wrapper>
    </>
  )
}

// Home.propTypes = {
//   filterList: [],
// }

// Home.defaultProps = {
//   filterList: PropTypes.arrayOf(PropTypes.number),
// }

const mapStateToProps = ({ home }) => {
  const { filterList } = home
  return { filterList }
}

export default connect(mapStateToProps)(Home)
