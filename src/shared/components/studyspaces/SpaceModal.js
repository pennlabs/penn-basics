import React from 'react';
import PropTypes from 'prop-types';

import {
  Title,
  Text,
  Modal,
  ModalContainer,
  Image,
} from '../shared';

const SpaceModal = ({
  show,
  toggle,
  name,
  image,
  description,
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

    {description && (
      <ModalContainer>
        <Text>{description}</Text>
      </ModalContainer>
    )}
  </Modal>
);

SpaceModal.defaultProps = {
  description: '',
  image: '',
};

SpaceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default SpaceModal;
