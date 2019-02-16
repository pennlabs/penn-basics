// Import frameworks
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from 'styled-components';

import {
  Row,
  Col,
  Card,
  Subtitle,
  Line,
} from '../shared';
import { WHITE, DARK_GRAY } from '../../styles/colors';
import { NAV_HEIGHT } from '../../styles/sizes';

import venueData from './content/venueData';

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`;

const Nav = ({ children }) => (
  <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
    <Col
      padding="0 0 .5rem 0"
      background={WHITE}
      overflowY="scroll"
      width="25%"
      borderRight
    >
      {Object.keys(venueData).map((key) => {
        const { name } = venueData[key];

        return (
          <StyledLink to={`/dining/${key}`} key={key}>
            <Card padding="0.5rem 1rem" hoverable>
              <Subtitle marginBottom="0">
                {name}
              </Subtitle>
            </Card>

            <Line />
          </StyledLink>
        );
      })}
    </Col>
    <Col
      width="75%"
      overflowY="scroll"
    >
      {children}
    </Col>
  </Row>
);

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nav;
