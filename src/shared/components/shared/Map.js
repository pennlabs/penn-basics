/* global google, document */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MapWrapper = styled.div`
  width: 100%;
  flex: 1;
  height: ${({ height }) => height || '100%'};
`;

export class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      geocoder: null,
    };

    this.waitForGoogle = this.waitForGoogle.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.createMarker = this.createMarker.bind(this);
  }

  componentDidMount() {
    this.waitForGoogle();
  }

  setMarker() {
    const existingMarker = this.state.marker; // eslint-disable-line

    // Remove an existing marker if there is one
    if (existingMarker) {
      existingMarker.setMap(null);
    }

    const { location } = this.props;
    const newMarker = this.createMarker({ location });

    this.setState({
      marker: newMarker,
    });
  }

  createMarker({ location, icon }) {
    const { map } = this.state;

    return new google.maps.Marker({
      position: location,
      icon,
      map,
    });
  }

  initMap() {
    const { location, mapId, gestureHandling = '' } = this.props;
    const map = new google.maps.Map(document.getElementById(mapId), {
      center: location,
      zoom: 16,
      gestureHandling,
    });

    const geocoder = new google.maps.Geocoder();

    this.setState({
      map,
      geocoder,
    }, () => {
      this.setMarker();
    });
  }

  waitForGoogle() {
    if (typeof google !== 'undefined') {
      this.initMap();
    } else {
      // Check again if google is defined
      setTimeout(this.waitForGoogle, 125);
    }
  }

  render() {
    const { height, mapId } = this.props;

    return (
      <MapWrapper height={height} id={mapId} />
    );
  }
}

Map.defaultProps = {
  location: {
    lat: 39.9522,
    lng: -75.1932,
  },
  height: undefined,
  gestureHandling: '',
};

Map.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  height: PropTypes.string,
  mapId: PropTypes.string.isRequired,
  gestureHandling: PropTypes.string,
};
