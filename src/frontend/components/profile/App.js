/* global window */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'

import { Title, BorderedCard, Card, Row, Col, Line } from '../shared'
import { getFavorites } from '../../actions/dining_actions'
import { getFavoritesHomePage } from '../../actions/laundry_actions'
import { BORDER, FOCUS_GRAY, MEDIUM_GRAY, DARK_GRAY } from '../../styles/colors'

const StyledCard = s(Card)`
  padding: 0em;
  border-radius: 4px;
  border: 1px solid ${BORDER};
  margin-top: 0.5em;
`

const InputField = s.input`
  font-size: 16px;
  font-weight: 400;
  border: 1px solid ${FOCUS_GRAY};
  background: transparent;
  margin-right: 1em;
  color: ${MEDIUM_GRAY};
  padding: 0.5em;
  margin-left: 1em;
  
  :focus {
    outline: none;
    color: ${DARK_GRAY};
    border-bottom-color: ${BORDER};
  }
`

const App = ({
  dispatchGetDiningFavorites,
  diningFavorites,
  dispatchGetLaundryFavorites,
  laundryFavorites,
  userInfo = {},
}) => {
  useEffect(() => {
    dispatchGetDiningFavorites()
    dispatchGetLaundryFavorites()
  }, [])

  const { fullName, displayName } = userInfo

  return (
    <div style={{ padding: '1em 5em' }}>
      <Title> Profile </Title>
      <BorderedCard>
        Display Name
        <InputField value={displayName || fullName} />
      </BorderedCard>
      <Title> Favorites </Title>
      <Row>
        <Col>
          <div style={{ marginRight: '0.5em' }}>
            Dining
            <StyledCard>
              {diningFavorites.map(id => (
                <>
                  <p style={{ padding: '1rem' }}>{id}</p>
                  <Line />
                </>
              ))}
            </StyledCard>
          </div>
        </Col>
        <Col>
          <>
            Laundry
            <StyledCard>
              {laundryFavorites.map(hall => (
                <>
                  <p style={{ padding: '1rem' }}>{hall.hall_name}</p>
                  <Line />
                </>
              ))}
            </StyledCard>
          </>
        </Col>
      </Row>
      <Title> Authored Reviews </Title>
      <BorderedCard>Display Name</BorderedCard>
      <a
        href="/api/auth/logout"
        className="button is-info"
        style={{ color: 'white' }}
      >
        Logout
      </a>
    </div>
  )
}

const mapStateToProps = ({ dining, laundry, authentication }) => {
  const { favorites: diningFavorites } = dining
  const { favoritesHome: laundryFavorites } = laundry
  const { userInfo } = authentication

  return {
    diningFavorites,
    laundryFavorites,
    userInfo,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetDiningFavorites: () => dispatch(getFavorites()),
  dispatchGetLaundryFavorites: () => dispatch(getFavoritesHomePage()),
  // dispatchAddFavorite: ({ venueId }) => dispatch(addFavorite(venueId)),
  // dispatchRemoveFavorite: ({ venueId }) => dispatch(removeFavorite(venueId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
