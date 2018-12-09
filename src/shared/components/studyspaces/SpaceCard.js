import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SpaceModal from './SpaceModal';
import {
  Card,
  Subtitle,
  Subtext,
  Row,
  Col,
} from '../shared';
import { setHoveredSpace } from '../../actions/spaces_actions';
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
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
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

  handleMouseEnter() {
    const {
      hoveredSpace,
      spaceId,
      setHoveredSpaceDispatch,
    } = this.props;

    // If there is no change to be made
    if (hoveredSpace === spaceId) return;

    setHoveredSpaceDispatch(spaceId);
  }

  render() {
    const {
      name,
      open,
      image,
      quiet,
      outlets,
      hours,
    } = this.props;
    const { showModal } = this.state;
    const noiseLevel = getNoiseLevel(quiet);
    const outletsLevel = getOutletsLevel(outlets);

    return (
      <Card onClick={this.toggleModal} onKeyPress={this.handleKeyPress} padding="0.5rem 1rem" hoverable>
        <Row>
          {image && (
            <Col backgroundImage={image} width="30%" borderRadius="4px" />
          )}
          <Col
            padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}
            onMouseEnter={this.handleMouseEnter}
          >
            <Subtitle marginBottom="0">
              {name}
            </Subtitle>

            <Subtext marginBottom="0">
              {open ? `Open: ${hours}` : 'Closed'}
              {outletsLevel ? ` • ${outletsLevel}` : ''}
              {noiseLevel ? ` • ${noiseLevel}` : ''}
            </Subtext>

            {/* TODO ONLY ONE MODAL <SpaceModal
              show={showModal}
              toggle={this.toggleModal}
              {...this.props}
            /> */}
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

const mapStateToProps = ({ spaces }) => {
  const { hoveredSpace } = spaces;
  return { hoveredSpace };
};

const mapDispatchToProps = dispatch => ({
  setHoveredSpaceDispatch: spaceId => dispatch(setHoveredSpace(spaceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpaceCard);
