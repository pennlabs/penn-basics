import React from 'react'
import PropTypes from 'prop-types'

import { BorderedCard, Row, Col, ColSpace, Line } from '../shared'
import externalLinksData from '../../../server/resources/externalLinks.json'
import usefulLinksData from '../../../server/resources/usefulLinks.json'

const ExternalLink = ({ pictureURL, websiteURL, productName }) => {
  return (
    <BorderedCard>
      <Row>
        <Col width="20%">
          <a href={websiteURL} target="_blank" rel="noopener noreferrer">
            <img src={pictureURL} alt={productName} />
          </a>
        </Col>
        <ColSpace />
        <Col>
          <a href={websiteURL} target="_blank" rel="noopener noreferrer">
            {productName}
          </a>
        </Col>
      </Row>
    </BorderedCard>
  )
}

const ExternalLinks = () => (
  <BorderedCard>
    <h1 className="title is-4">More in the Penn Ecosystem</h1>

    {externalLinksData.map(data => {
      return <ExternalLink key={data.productName} {...data} />
    })}

    <Line />
    <br />

    {usefulLinksData.map(({ websiteURL, description }, index) => {
      return (
        <>
          <a href={websiteURL} target="_blank" rel="noopener noreferrer">
            {description}
          </a>
          {index === usefulLinksData.length - 1 ? null : <br />}
        </>
      )
    })}
  </BorderedCard>
)

ExternalLink.defaultProps = {
  pictureURL: '',
  websiteURL: '',
  productName: '',
}

ExternalLink.propTypes = {
  pictureURL: PropTypes.string,
  websiteURL: PropTypes.string,
  productName: PropTypes.string,
}

export default ExternalLinks
