import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { WHITE, LIGHT_GRAY } from '../../styles/colors';

const Z_INDEX = 1200;
const WRAPPER_SHADE = 'rgba(0, 0, 0, 0.5)';
const ANIMATION_DURATION = '0.3s';

// TODO mobile responsiveness

const fadeIn = keyframes`
  0% {
    opacity: 0;
    max-height: 100vh;
  }

  100% {
    opacity: 1;
    max-height: 100vh;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    max-height: 100vh;
  }

  100% {
    opacity: 0;
    max-height: 100vh;
  }
`;

const slideIn = keyframes`
  0% {
    margin-left: 100%;
  }

  100% {
    margin-left: 50%;
  }
`;

const slideOut = keyframes`
  0% {
    margin-left: 50%;
  }

  100% {
    margin-right: 100%;
  }
`;

const slideInMobile = keyframes`
  0% {
    margin-left: 100%;
  }

  100% {
    margin-left: 25%;
  }
`;

const slideOutMobile = keyframes`
  0% {
    margin-left: 25%;
  }

  100% {
    margin-right: 100%;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${WRAPPER_SHADE};
  z-index: ${Z_INDEX};
  animation-name: ${({ isNewlyMounted, show }) => {
    if (isNewlyMounted) {
      return '';
    }
    if (show) {
      return fadeIn;
    }

    return fadeOut;
  }};
  animation-duration: ${ANIMATION_DURATION};
  max-height: ${({ show }) => (show ? '100vh' : '0vh')};
  opacity: ${({ show }) => (show ? '1' : '0')};
`;

const ModalContent = styled.div`
  min-height: 100%;
  background: ${WHITE};
  width: 50%;
  margin-left: ${({ show }) => (show ? '50%' : '100%')};
  animation-name: ${({ show }) => (show ? slideIn : slideOut)};
  animation-duration: ${ANIMATION_DURATION};
  box-sizing: border-box;
  padding: 10.41vh 0;

  @media screen and (max-width: 900px) {
    width: 75%;
    margin-left: ${({ show }) => (show ? '25%' : '100%')};
    animation-name: ${({ show }) => (show ? slideInMobile : slideOutMobile)};
  }
`;

const ModalClose = styled.p`
  float: right;
  margin-top: -4.16vh;
  margin-right: 4.16vw;
  transition: opacity 0.2s ease;
  font-size: 200%;
  color: ${LIGHT_GRAY};
  cursor: hand;

  :hover {
    opacity: 0.5;
  }
`;

function noop(event) {
  event.stopPropagation();
}

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewlyMounted: true,
    };

    this.makeNotNewlyMounted = this.makeNotNewlyMounted.bind(this);
  }

  // Avoid animations showing on load
  componentDidUpdate(prevProps) {
    const { show } = this.props;
    const { isNewlyMounted } = this.state;

    if (isNewlyMounted && prevProps.show !== show) {
      this.makeNotNewlyMounted();
    }
  }

  makeNotNewlyMounted() {
    this.setState({
      isNewlyMounted: false,
    });
  }

  render() {
    const { show, toggle, children } = this.props;
    const { isNewlyMounted } = this.state;

    return (
      <ModalWrapper show={show} onClick={toggle} isNewlyMounted={isNewlyMounted}>
        <ModalContent onClick={noop} show={show}>
          <ModalClose onClick={toggle}>
            &times;
          </ModalClose>

          { children }
        </ModalContent>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line
};

export const ModalContainer = styled.div`
  padding: 0 8.33vw;
`;
