/* global window */

import React, { Component } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
import Hours from './Hours'
import Modal from '../shared/Modal'

const Credit = s.div`
  width: 100%;
  padding: 0 1rem;
`
const GOOGLE_URL = `https://maps.google.com/maps?q=`

class SpaceModal extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    const { clearActiveSpaceDispatch } = this.props
    clearActiveSpaceDispatch()
  }

  render() {
    const { spaceId, spacesData } = this.props
    const space = spacesData[spaceId]
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
      <Modal show={show} toggle={this.toggle}>
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

              {location && location.lat && location.lng ? (
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

              <ModalContainer paddingTop="1.5rem">
                <Hours start={start} end={end} />
              </ModalContainer>
            </>
          )}
        </div>
      </Modal>
    )
  }
}

SpaceModal.defaultProps = {
  location: null,
  spaceId: null,
  spacesData: {},
}

SpaceModal.propTypes = {
  spaceId: PropTypes.string,
  clearActiveSpaceDispatch: PropTypes.func.isRequired,
  spacesData: PropTypes.object, // eslint-disable-line
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}

const mapStateToProps = ({ spaces }) => {
  const { spacesData, activeSpace } = spaces
  return {
    spacesData,
    activeSpace,
  }
}

const mapDispatchToProps = dispatch => ({
  clearActiveSpaceDispatch: () => dispatch(clearActiveSpace()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceModal)
