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

const SpaceModal = ({
  show,
  toggle,
  name,
  image,
  description,
  address,
  location,
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

    <ModalContainer>
      <Text>
        <strong>Description:</strong>
      </Text>
      <br />
      <Text>
        {description}
      </Text>
    </ModalContainer>

    <ModalContainer background={SNOW} paddingTop="1rem" paddingBottom="0.5rem">
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
        gestureHandling="cooperative"
        height="50%"
      />
    ) : null}
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
};

export default SpaceModal;
