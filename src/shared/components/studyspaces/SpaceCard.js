import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SpaceModal from './SpaceModal';
import {
  Card,
  Subtitle,
  Text,
  Row,
  Col,
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
    const {
      name,
      open,
      description,
      image,
    } = this.props;
    const { showModal } = this.state;

    return (
      <Card onClick={this.toggleModal} onKeyPress={this.handleKeyPress} padding="0.5rem 0">
        <Row>
          {image && (
            <Col backgroundImage={image} width="30%" />
          )}
          <Col padding={image ? '0 0 0 1rem' : '0'}>
            <Subtitle>
              {name}
            </Subtitle>

            <Text marginBottom="0">
              {open ? 'Open Af' : 'Closed Af'}
            </Text>

            <SpaceModal
              show={showModal}
              toggle={this.toggleModal}
              name={name}
              image={image}
              description={description}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

SpaceCard.defaultProps = {
  open: false,
  description: '',
  image: '',
};

SpaceCard.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default SpaceCard;
