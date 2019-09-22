import React from 'react'
import { Link } from 'react-router-dom'
import s from 'styled-components'

const LinksDiv = s.div`
  margin-left: auto;
  padding-top: 14px;

  a {
    margin-left: 1.5rem;
    height: 100%;
  }
`

const Links = () => (
  <LinksDiv>
    <Link to="/dining">Dining</Link>
    <Link to="/laundry">Laundry</Link>
    <Link to="/studyspaces">Studyspaces</Link>
  </LinksDiv>
)

export default Links
