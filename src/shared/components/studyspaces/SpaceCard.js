import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Title,
  Text,
  Modal,
} from '../shared';

// TODO render other info
class SpaceCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  }

  handleKeyPress(event) {
    if (event.keyCode === 32) {
      this.toggleModal();
    }
  }

  render() {
    const { name, open } = this.props;
    const { showModal } = this.state;

    return (
      <Card onClick={this.toggleModal} onKeyPress={this.handleKeyPress}>
        <Title>
          {name}
        </Title>

        <Text marginBottom="0">
          {open ? 'Open Af' : 'Closed Af'}
        </Text>

        <Modal show={showModal} toggle={this.toggleModal}>
          <Title>{name}</Title>
        </Modal>
      </Card>
    );
  }
}

SpaceCard.defaultProps = {
  open: false,
};

SpaceCard.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

export default SpaceCard;
