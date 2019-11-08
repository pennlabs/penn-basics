import React from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'

import { BorderedCard, FlexRow, Col, ColSpace, Line, Subtitle } from '../shared'
import externalLinksData from '../../../server/resources/home/externalLinks.json'
import usefulLinksData from '../../../server/resources/home/usefulLinks.json'
import { BORDER, HOVER_GRAY } from '../../styles/colors'
import { BORDER_RADIUS } from '../../styles/sizes'
import { logEvent } from '../../analytics/index'

const ExternalLinkTag = s.a`
  border: 1px solid ${BORDER};
  border-radius: ${BORDER_RADIUS};
  padding: 0.5rem;
  display: inline-block;
  width: 100%;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${HOVER_GRAY};
  }
`

const ExternalLinkImg = s.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
  display: block;
`

const ExternalLink = ({ pictureURL, websiteURL, productName }) => {
  return (
    <ExternalLinkTag
      href={websiteURL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => logEvent('external links', productName)}
    >
      <FlexRow>
        <Col width="2rem">
          <ExternalLinkImg src={pictureURL} alt={productName} />
        </Col>
        <Col>{productName}</Col>
      </FlexRow>
    </ExternalLinkTag>
  )
}

const ExternalLinks = () => (
  <BorderedCard>
    <Subtitle>More in the Penn Ecosystem</Subtitle>

    {externalLinksData.map(data => {
      return <ExternalLink key={data.productName} {...data} />
    })}

    <Line margin="0.5rem 0" />

    {usefulLinksData.map(({ websiteURL, description }, index) => {
      return (
        <>
          <a
            href={websiteURL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => logEvent('external links', description)}
          >
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
