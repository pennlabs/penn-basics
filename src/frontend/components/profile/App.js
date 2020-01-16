import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'

import { Title, BorderedCard, Card, Row, Col, Line } from '../shared'
import { getFavorites } from '../../actions/dining_actions'
import { getFavoritesHomePage } from '../../actions/laundry_actions'
import { BORDER } from '../../styles/colors'

const StyledCard = s(Card)`
  padding: 0em;
  border-radius: 4px;
  border: 1px solid ${BORDER};
  margin-top: 0.5em;
`

const App = ({
  dispatchGetDiningFavorites,
  diningFavorites,
  dispatchGetLaundryFavorites,
  laundryFavorites,
}) => {
  useEffect(() => {
    dispatchGetDiningFavorites()
    dispatchGetLaundryFavorites()
  }, [])

  return (
    <div style={{ padding: '1em 5em' }}>
      <Title> Profile </Title>
      <BorderedCard>
        Display Name
        <input />
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
      <BorderedCard>
        Display Name
      </BorderedCard>
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

const mapStateToProps = ({ dining, laundry }) => {
  const { favorites: diningFavorites } = dining
  const { favoritesHome: laundryFavorites } = laundry

  return {
    diningFavorites,
    laundryFavorites,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetDiningFavorites: () => dispatch(getFavorites()),
  dispatchGetLaundryFavorites: () => dispatch(getFavoritesHomePage()),
  // dispatchAddFavorite: ({ venueId }) => dispatch(addFavorite(venueId)),
  // dispatchRemoveFavorite: ({ venueId }) => dispatch(removeFavorite(venueId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
