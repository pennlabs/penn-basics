import React from 'react';
import PropTypes from 'prop-types';

import {
  Title,
  Text,
  Modal,
  ModalContainer,
  Image,
  Map,
} from '../shared';
import { SNOW } from '../../styles/colors';
import Hours from './Hours';

const SpaceModal = ({
  show,
  toggle,
  name,
  image,
  description,
  address,
  location,
  start,
  end,
}) => (
  <Modal show={show} toggle={toggle}>
    <ModalContainer>
      <Title marginBottom="2.5vh">{name}</Title>
    </ModalContainer>

    {image && (
      <Image
        src={image}
        alt={name}
        marginBottom="2.5vh"
      />
    )}

    <ModalContainer paddingTop="0.5rem">
      <Text>
        <strong>Description:</strong>
      </Text>
      <br />
      <Text>
        {description}
      </Text>
    </ModalContainer>

    <ModalContainer background={SNOW} paddingTop="1.5rem" paddingBottom="1rem">
      <Text>
        <strong>Address:</strong>
      </Text>
      <br />
      <Text>
        {address}
      </Text>
    </ModalContainer>

    {location && location.lat && location.lng ? (
      <Map
        mapId={name}
        location={location}
        showMarker
        gestureHandling="cooperative"
        height="50%"
      />
    ) : null}

    <ModalContainer paddingTop="1.5rem">
      <Hours start={start} end={end} />
    </ModalContainer>
  </Modal>
);

SpaceModal.defaultProps = {
  description: '',
  image: '',
  address: '',
  location: null,
};

SpaceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  address: PropTypes.string,
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  start: PropTypes.arrayOf(PropTypes.number).isRequired,
  end: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SpaceModal;
