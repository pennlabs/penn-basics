import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import { BorderedCard, ImageZoom, Col, ColSpace, Row } from '../shared'

const renderNews = ({ picture, link, title, content, time }) => {
  return (
    <Row>
      <Col width="70%">
        <a href={link}>
          <ImageZoom src={picture} alt="First" />
        </a>
      </Col>
      <ColSpace />
      <Col>
        <p className="is-size-6">
          <strong>
            <a href={link}>{title}</a>
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
  )
}

class News extends Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount() {
    const website = 'https://www.thedp.com/'
    const className = 'col-lg-6 col-md-5 col-sm-12 frontpage-carousel'
    axios
      .post('/api/news', {
        website,
        className,
      })
      .then(res => {
        this.setState({ data: res.data })
      })
  }

  render() {
    const { data } = this.state

    if (!data) {
      return null
    }
    return (
      <BorderedCard>
        <h1 className="title is-4">Latest News</h1>
        <h6 className="subtitle is-6">
          More from &nbsp;
          <i>
            <a href="https://www.thedp.com/">The Daily Pennsylvanian</a>
          </i>
        </h6>
        {data && renderNews(data)}
      </BorderedCard>
    )
  }
}

renderNews.defaultProps = {
  picture: '',
  link: '',
  title: '',
  content: '',
  time: '',
}

renderNews.propTypes = {
  picture: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
}

export default News
