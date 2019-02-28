// Import frameworks
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from 'styled-components';

import {
  Row,
  Col,
  Card,
  Scrollbar,
  Subtitle,
  Subtext,
  Line,
} from '../shared';
import { WHITE, DARK_GRAY } from '../../styles/colors';
import { NAV_HEIGHT } from '../../styles/sizes';

import venueData from '../../../server/database/venue_info.json';

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`;

const Nav = ({ children }) => (
  <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
    <Scrollbar
      padding="0 0 .5rem 0"
      background={WHITE}
      overflowY="scroll"
      width="30%"
      borderRight
    >
      {Object.keys(venueData).map((key) => {
        const { name, image } = venueData[key];

        const img = `/img/venue_images/${image}`;

        return (
          <StyledLink to={`/dining/${key}`} key={key}>
            <Card padding="0.5rem 1rem" hoverable>
              <Row>
                {image && (
                  <Col backgroundImage={img} width="30%" borderRadius="4px" />
                )}
                <Col
                  padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}
                  onMouseEnter={this.handleMouseEnter}
                >
                  <Subtitle marginBottom="0">
                    {name}
                  </Subtitle>

                  <Subtext marginBottom="0">
                    This is some subtext
                  </Subtext>
                </Col>
              </Row>
            </Card>

            <Line />
          </StyledLink>
        );
      })}
    </Scrollbar>
    <Col
      width="70%"
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
