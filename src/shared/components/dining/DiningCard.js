// Import frameworks
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
    Circle
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
const Content = s.div`
  width: 100%;
  position: relative;
  overflow-x: visible;
  padding-right: 0.5rem;
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

        // get the array of hours that are opened today
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const openHours = venueHours.filter(hour => hour.date.substring(0, hour.date.indexOf('T')) === `${year}-${month}-${day}`);

        if (openHours.length === 0) {
            return (
                <>
                    <Subtext marginBottom="0">
                        Closed
                </Subtext>
                    <Circle open={false} />
                </>
            )
        }

        // get the array of hours that are opened right now
        const currentHours = openHours.filter(hour => {
            const open = new Date(`${hour.date.substring(0, hour.date.indexOf('T'))}T${hour.open}`);
            const close = new Date(`${hour.date.substring(0, hour.date.indexOf('T'))}T${hour.close}`);
            return date >= open && date <= close;
        })

        if (currentHours.length === 0) {
            return (
                <>
                    <Subtext marginBottom="0">
                        Closed
                    </Subtext>
                    <Circle open={false} />
                </>
            )
        }

        // get the open and close time for the current meal
        const openHour = currentHours[0].open.substring(0, currentHours[0].open.lastIndexOf(':'));
        const closeHour = currentHours[0].close.substring(0, currentHours[0].close.lastIndexOf(':'));

        return (
            <>
                <Subtext marginBottom="0">
                    {`Open: ${openHour} - ${closeHour} • ${currentHours[0].type}`}
                </Subtext>
                <Circle open={true} />
            </>
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
                            <Content>
                                <Subtitle marginBottom="0">
                                    {name}
                                </Subtitle>

                                {this.renderSubtext()}
                            </Content>
                        </Col>
                    </Row>
                </Card>
                <Line />
            </StyledLink>
        );
    }
}

export default DiningCard;