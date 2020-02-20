import React from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'

import data from '../../../server/resources/dining/venue_info.json'
import { addFavorite, removeFavorite } from '../../actions/dining_actions'
import DiningOverview from './DiningOverview'
import NotFound from '../shared/NotFound'
import Loading from '../shared/Loading'
import FavoriteButton from '../shared/favorites/FavoriteButton'
import { NoData, Title } from '../shared'
import { maxWidth, PHONE } from '../../styles/sizes'
import { IDiningReducerState, TVenueData, IFavorite } from '../../../types/dining'

const venueData = data as TVenueData

const DiningHeader = s.div`
  position: relative;
  padding-bottom: 0;
  margin-bottom: 1rem;

  ${maxWidth(PHONE)} {
    padding: 1rem;
    margin-bottom: 0;
  }
`

const Buttons = s.div`
  position: absolute;
  right: 0;
  top: 0;

  ${maxWidth(PHONE)} {
    width: 100%;
    margin-bottom: 1rem;
    position: relative;
  }
`

const Wrapper = s.div`
  padding: 1rem;

  ${maxWidth(PHONE)} {
    padding: 0;
  }
`

interface IDiningVenueProps {
  favorites: IFavorite[]
  venueId: string
  venueHoursPending: boolean
  dispatchAddFavorite: ({ venueId }: { venueId: string }) => void
  dispatchRemoveFavorite: ({ venueId }: { venueId: string }) => void
}

const DiningVenue: React.FC<IDiningVenueProps> = ({
  favorites,
  venueId,
  venueHoursPending,
  dispatchAddFavorite,
  dispatchRemoveFavorite,
}: IDiningVenueProps) => {
  if (!venueId) {
    return (
      <NoData
        image="/img/dining.png"
        imageAlt="Dining plate"
        text="Select a dining hall to see information"
      />
    )
  }

  // If the ID is not found
  if (!venueData[venueId]) {
    return (
      <Wrapper>
        <NotFound />
      </Wrapper>
    )
  }

  // If content is still loading
  if (venueHoursPending) {
    return (
      <Wrapper>
        <Loading padding="40vh 0" />
      </Wrapper>
    )
  }

  const { name } = venueData[venueId]
  const isFavorited = favorites.includes(venueId)

  return (
    <Wrapper>
      <DiningHeader>
        <Title>{name}</Title>
        <Buttons>
          <FavoriteButton
            isFavorited={isFavorited}
            addFunction={props =>
              dispatchAddFavorite(props as { venueId: string })
            }
            removeFunction={props =>
              dispatchRemoveFavorite(props as { venueId: string })
            }
            addParams={{ venueId }}
            removeParams={{ venueId }}
          />
        </Buttons>
      </DiningHeader>

      <DiningOverview id={venueId} />
    </Wrapper>
  )
}

const mapStateToProps = ({ dining }: { dining: IDiningReducerState }) => {
  const { venueHoursPending, favorites } = dining

  return {
    venueHoursPending,
    favorites,
  }
}

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchAddFavorite: ({ venueId }: { venueId: string }) =>
    dispatch(addFavorite(venueId)),
  dispatchRemoveFavorite: ({ venueId }: { venueId: string }) =>
    dispatch(removeFavorite(venueId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DiningVenue)
