import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from 'styled-components'

// import SpaceModal from './SpaceModal';
import {
  Card,
  Subtitle,
  Subtext,
  Row,
  Col,
} from '../shared';
import { GREEN, BORDER } from '../../styles/colors'
import { setHoveredSpace, setActiveSpace } from '../../actions/spaces_actions';
import { getNoiseLevel, getOutletsLevel } from './mapper';

const Circle = s.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ open }) => (open ? GREEN : BORDER)};
`

const Content = s.div`
  width: 100%;
  position: relative;
  overflow-x: visible;
  padding-right: 0.5rem;
`

// TODO hours for the day?

// TODO update the map when markers update

class SpaceCard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleKeyPress(event) {
    if (event.keyCode === 32) {
      this.handleClick();
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

  handleClick() {
    const { setActiveSpaceDispatch, spaceId } = this.props;
    setActiveSpaceDispatch(spaceId);
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
    const noiseLevel = getNoiseLevel(quiet);
    const outletsLevel = getOutletsLevel(outlets);

    return (
      <Card
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        padding="0.5rem 0.5rem 0.5rem 1rem"
        hoverable
      >
        <Row>
          {image && (
            <Col backgroundImage={image} width="30%" borderRadius="4px" />
          )}
          <Col
            padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}
            onMouseEnter={this.handleMouseEnter}
          >
            <Content>
              <Subtitle marginBottom="0">
                {name}
              </Subtitle>

              <Subtext marginBottom="0">
                {open ? `Open: ${hours}` : 'Closed'}
                {outletsLevel ? ` • ${outletsLevel}` : ''}
                {noiseLevel ? ` • ${noiseLevel}` : ''}
              </Subtext>

              <Circle open={open} />
            </Content>
          </Col>
        </Row>
      </Card>
    );
  }
}

SpaceCard.defaultProps = {
  open: false,
  image: '',
  outlets: 0,
  quiet: -1,
  hoveredSpace: null,
};

SpaceCard.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool,
  image: PropTypes.string,
  outlets: PropTypes.number,
  quiet: PropTypes.number,
  hours: PropTypes.string.isRequired,
  hoveredSpace: PropTypes.string,
  spaceId: PropTypes.string.isRequired,
  setHoveredSpaceDispatch: PropTypes.func.isRequired,
  setActiveSpaceDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ spaces }) => {
  const { hoveredSpace } = spaces;
  return { hoveredSpace };
};

const mapDispatchToProps = dispatch => ({
  setHoveredSpaceDispatch: spaceId => dispatch(setHoveredSpace(spaceId)),
  setActiveSpaceDispatch: spaceId => dispatch(setActiveSpace(spaceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpaceCard);
