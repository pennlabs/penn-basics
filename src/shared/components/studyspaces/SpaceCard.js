import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SpaceModal from './SpaceModal';
import {
  Card,
  Subtitle,
  Subtext,
  Row,
  Col,
} from '../shared';
import { getNoiseLevel, getOutletsLevel } from './mapper';

// TODO hours for the day?

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
      image,
      quiet,
      outlets,
    } = this.props;
    const { showModal } = this.state;
    const noiseLevel = getNoiseLevel(quiet);
    const outletsLevel = getOutletsLevel(outlets);

    return (
      <Card onClick={this.toggleModal} onKeyPress={this.handleKeyPress} padding="0.5rem 0">
        <Row>
          {image && (
            <Col backgroundImage={image} width="30%" borderRadius="4px" />
          )}
          <Col padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}>
            <Subtitle marginBottom="0">
              {name}
            </Subtitle>

            <Subtext marginBottom="0">
              {open ? 'Open' : 'Closed'}
              {outletsLevel ? ` • ${outletsLevel}` : ''}
              {noiseLevel ? ` • ${noiseLevel}` : ''}
            </Subtext>

            <SpaceModal
              show={showModal}
              toggle={this.toggleModal}
              {...this.props}
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
  outlets: 0,
  quiet: -1,
};

SpaceCard.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool,
  description: PropTypes.string,
  image: PropTypes.string,
  outlets: PropTypes.number,
  quiet: PropTypes.number,
};

export default SpaceCard;
