import React from 'react'

import { Col } from './Flex'
import { Subtext } from './Typography'
import { logEvent } from '../../../utils/analytics'
import { FEEDBACK_LINK } from '../../constants/routes'
import HeartIcon from '../../../../public/img/heart.svg'

interface IPennLabsCreditProps {
  padding?: string
}

const PennLabsCredit = ({ padding }: IPennLabsCreditProps) => (
  <Col padding={padding || '0 1rem'}>
    <Subtext paddingTop="0.5rem" marginBottom="0">
      Made with
      <HeartIcon
        style={{ transform: 'scale(0.6) translateY(11px)' }}
        color="#E25252"
        fill="#E25252"
      />
      by&nbsp;
      <a
        href="https://pennlabs.org"
        target="_BLANK"
        rel="noopener noreferrer"
        onClick={() => logEvent('external links', 'penn labs')}
      >
        Penn Labs.
      </a>
      &nbsp;
      <a
        href={FEEDBACK_LINK}
        target="_BLANK"
        rel="noopener noreferrer"
        onClick={() => logEvent('feeback', 'click from footer')}
      >
        Feedback.
      </a>
    </Subtext>
  </Col>
)

export default PennLabsCredit
