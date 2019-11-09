import React, { useState } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

import StarIcon from '../../../../public/img/foodtrucks/star.svg'
import { Text } from '../shared'
import { FOCUS_GRAY, BORDER } from '../../styles/colors'

const TextArea = s.textarea`
  resize: none;
  width: 100%;
  height: 10em;
  border: 1px solid ${FOCUS_GRAY};
  padding: 1em;
  margin-bottom: 1em;

  :focus {
    outline: none;
    border: 1px solid ${BORDER};
  }
`

const Buttons = s.div`
  float: right;
`

const array = [1, 2, 3, 4, 5]

const Rating = ({ setIsEdited }) => {
  const [rating, setRating] = useState(null)

  return (
    <div>
      {array.map(index => (
        <span // eslint-disable-line
          style={{ marginRight: '0.5em', cursor: 'pointer' }}
          onClick={() => {
            setRating(index)
            setIsEdited(true)
          }}
        >
          <StarIcon
            color="#ffc520"
            fill={rating && index <= rating ? '#ffc520' : 'none'}
            viewBox="0 0 25 25"
          />
        </span>
      ))}
    </div>
  )
}

const Form = ({ show, hideFunction }) => {
  const [isEdited, setIsEdited] = useState(false)
  if (!show) return null

  return (
    <div style={{ marginBottom: '3rem' }}>
      <Text>
        <strong>Write a Review</strong>
      </Text>
      <br />
      <Rating setIsEdited={setIsEdited} />
      <br />
      <TextArea />
      <Buttons>
        <span // eslint-disable-line
          className="button is-light"
          onClick={() => {
            hideFunction()
            setIsEdited(false)
          }}
        >
          Cancel
        </span>
        <span // eslint-disable-line
          className="button is-success is-light"
          style={{ marginLeft: '0.5rem' }}
          disabled={!isEdited}
        >
          Submit
        </span>
      </Buttons>
    </div>
  )
}

Form.defaultProps = {
  show: false,
}

Form.propTypes = {
  show: PropTypes.bool,
  hideFunction: PropTypes.func.isRequired,
}

Rating.propTypes = {
  setIsEdited: PropTypes.func.isRequired,
}

export default Form
