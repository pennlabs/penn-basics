/* global window */
import React from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ISpacesReducerState } from 'src/frontend/reducers/spacesReducer'
import { clearActiveSpace } from '../../actions/spaces_actions'
import {
  Title,
  Text,
  ModalContainer,
  Image,
  Tag,
  Map,
  Subtext,
} from '../shared'
import { SNOW } from '../../styles/colors'
import { Hours } from './Hours'
import Modal from '../shared/Modal'
import { STUDYSPACES_ROUTE } from '../../constants/routes'
import { TSpaceId, ISpaceWithHoursAndOpenAndSpaceId } from '../../../types/studyspaces'

const Credit = s.div`
  width: 100%;
  padding: 0 1rem;
`
const GOOGLE_URL = 'https://maps.google.com/maps?q='

interface ISpaceModalProps {
  spaceId: string
  clearActiveSpaceDispatch: () => void
  spacesData?: Record<TSpaceId, ISpaceWithHoursAndOpenAndSpaceId>
  location?: {
    lat: number
    lng: number
  }
}

const SpaceModal = (props: ISpaceModalProps): React.ReactElement => {
  const { spaceId, spacesData } = props
  const space = spacesData && spacesData[spaceId]
  const show = Boolean(spaceId)

  const {
    name,
    image,
    description,
    address,
    location,
    imageCredit,
    start,
    end,
    tags,
  } = space || {}

  return (
    <Modal show={show} ROUTE={STUDYSPACES_ROUTE}>
      <div style={{ minHeight: '80vh' }}>
        {space && (
          <>
            <ModalContainer>
              <Title marginBottom="2.5vh">{name}</Title>
            </ModalContainer>

            {image && <Image src={image} alt={name} marginBottom="2.5vh" />}

            {imageCredit && (
              <Credit>
                <Subtext>
                  {'Image credit: '}
                  <a href={imageCredit.link}>
                    {imageCredit.name || imageCredit.link}
                  </a>
                </Subtext>
              </Credit>
            )}

            {description && (
              <ModalContainer paddingTop="0.5rem">
                <Text>{description}</Text>
              </ModalContainer>
            )}

            {tags && (
              <ModalContainer paddingBottom="0.5rem">
                {tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ModalContainer>
            )}

            <ModalContainer
              background={SNOW}
              paddingTop="1.5rem"
              paddingBottom="1rem"
            >
              <Text>
                <strong>Address</strong>
              </Text>
              <br />
              <Text>{address}</Text>
            </ModalContainer>

            {location && location.lat && location.lng && name ? (
              <Map
                mapId={name}
                location={location}
                showMarker
                gestureHandling="cooperative"
                height="50vh"
                handleClickMarker={() => {
                  window.open(`${GOOGLE_URL}${location.lat},${location.lng}`)
                }}
              />
            ) : null}

            {start && end && (
              <ModalContainer paddingTop="1.5rem">
                <Hours start={start} end={end} />
              </ModalContainer>
            )}
          </>
        )}
      </div>
    </Modal>
  )
}

const mapStateToProps = ({ spaces }: { spaces: ISpacesReducerState }) => {
  const { spacesData, activeSpace } = spaces
  return {
    spacesData,
    activeSpace,
  }
}

// TOOD clean this up
const mapDispatchToProps = (dispatch: (_arg: any) => Dispatch<any>) => ({
  clearActiveSpaceDispatch: () => dispatch(clearActiveSpace()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceModal)
