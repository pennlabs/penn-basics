// Import frameworks
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import s from 'styled-components'
import axios from 'axios';

import {
    Row,
    Col,
    Card,
    Scrollbar,
    Subtitle,
    Subtext,
    Line,
} from '../shared'
import {
    WHITE,
    DARK_GRAY,
    BABY_BLUE,
} from '../../styles/colors'

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`


class DiningCard extends Component {
    constructor(props) {
        super(props);
        const { venueId } = this.props;

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        // Set the end date to three days from now
        const endDate = new Date();
        endDate.setHours(72, 0, 0, 0);

        this.state = {
            hours: []
        }

        axios.post('/api/dining/venue_info/', {
            venueId,
            startDate,
            endDate,
        })
            .then((res) => {
                const { hours } = res.data;
                this.setState({ hours: hours });
            })
            .catch((error) => {
                this.setState({ hours: [] });
            });
    }

    renderSubtext() {
        const venueHours = this.state.hours;
        if (venueHours.length === 0) {
            return (
                <Subtext marginBottom="0">
                    Closed
                </Subtext>
            )
        }
        return (
            <Subtext marginBottom="0">
                Open
            </Subtext>
        )

    }

    render() {
        const { venueId, name, image } = this.props;
        // Images are served through the public folder
        const img = `/img/venue_images/${image}`;
        return (
            <StyledLink to={`/dining/${venueId}`} venueId={venueId}>
                <Card padding="0.5rem 1rem" hoverable>
                    <Row>
                        {image && (
                            <Col backgroundImage={img} width="30%" borderRadius="4px" />
                        )}
                        <Col
                            padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}
                        >
                            <Subtitle marginBottom="0">
                                {name}
                            </Subtitle>

                            {this.renderSubtext()}
                        </Col>
                    </Row>
                </Card>
                <Line />
            </StyledLink>
        );
    }
}

export default DiningCard;