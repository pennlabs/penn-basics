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
      markers: {},
    };

    this.waitForGoogle = this.waitForGoogle.bind(this);
    this.createMarker = this.createMarker.bind(this);
  }

  componentDidMount() {
    this.waitForGoogle();
  }

  createMarker(key, { location, icon = '' }) {
    if (!location) return;

    const { lat, lng } = location;

    if (typeof lat === 'undefined' || typeof lng === 'undefined') return;

    const { map } = this.state;

    const marker = new google.maps.Marker({
      position: location,
      icon,
      map,
    });

    const { markers } = this.state;
    markers[key] = marker;

    this.setState({ markers });
  }

  initMap() {
    const {
      location,
      mapId = 'map',
      gestureHandling = '',
      markers = {},
    } = this.props;

    const map = new google.maps.Map(document.getElementById(mapId), {
      center: location,
      zoom: 14,
      gestureHandling,
    });

    this.setState({
      map,
    }, () => {
      Object.keys(markers).forEach(key => this.createMarker(key, markers[key]));
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
  markers: {},
};

Map.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  height: PropTypes.string,
  mapId: PropTypes.string.isRequired,
  gestureHandling: PropTypes.string,
  markers: PropTypes.object, // eslint-disable-line
};
