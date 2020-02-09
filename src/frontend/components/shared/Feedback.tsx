import React from 'react'
import s from 'styled-components'

import { WHITE, BLUE, DARK_BLUE } from '../../styles/colors'
import { maxWidth, PHONE } from '../../styles/sizes'
import { logEvent } from '../../../utils/analytics'
import { FEEDBACK_LINK } from '../../constants/routes'

const DIAMETER = '3rem'
const OFFSET = 18

/**
 * Styles push closer to bottom corner on mobile
 */
const FeedbackLink = s.a<{}>`
  display: inline-block;
  width: ${DIAMETER};
  height: ${DIAMETER};
  border-radius: 3rem;
  background-color: ${BLUE};
  position: fixed;
  bottom: ${OFFSET}px;
  right: ${OFFSET}px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(25, 89, 130, .4);
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${DARK_BLUE};
  }

  ${maxWidth(PHONE)} {
    bottom: ${OFFSET / 2}px;
    right: ${OFFSET / 2}px;
  }
`

const Icon = s.i<{}>`
  fontSize: 24px;
  color: ${WHITE};
  line-height: ${DIAMETER};
`

const Feedback = (): React.ReactElement => (
  <FeedbackLink
    href={FEEDBACK_LINK}
    title="Feedback"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => logEvent('feeback', 'click from icon')}
  >
    <Icon className="fa-comment far fa-lg" />
  </FeedbackLink>
)

export default Feedback
