import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { BorderedCard, ImageZoom, Col, ColSpace, Row } from '../shared'

const News = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    const website = 'https://www.thedp.com/'
    const className = 'col-lg-6 col-md-5 col-sm-12 frontpage-carousel'
    axios
      .post('/api/news', {
        cancelToken: source.token,
        website,
        className,
      })
      .then(res => {
        setData(res.data)
      })
    return () => {
      source.cancel()
    }
  }, [])

  if (!data) {
    return null
  }

  const { picture, link, title, content, time } = data

  return (
    <BorderedCard>
      <h1 className="title is-4">Latest News</h1>
      <h6 className="subtitle is-6">
        More from &nbsp;
        <i>
          <a
            href="https://www.thedp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Daily Pennsylvanian
          </a>
        </i>
      </h6>
      <Row>
        <Col width="70%">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ImageZoom src={picture} alt="First" />
          </a>
        </Col>
        <ColSpace />
        <Col>
          <p className="is-size-6">
            <strong>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </strong>
            <br />
            <br />
            <small>{content}</small>
            <br />
            <br />
            <small>{time}</small>
          </p>
        </Col>
      </Row>
    </BorderedCard>
  )
}

export default News
