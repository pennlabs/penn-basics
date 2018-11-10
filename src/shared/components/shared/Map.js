/* global google, document */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RED = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
const BLUE = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

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

  componentDidUpdate(prevProps) {
    const { activeMarker } = this.props;
    const oldActiveMarker = prevProps.activeMarker;

    if (activeMarker !== oldActiveMarker) {
      this.updateMarker(oldActiveMarker, { icon: RED });
      this.updateMarker(activeMarker, { icon: BLUE });
    }
  }

  updateMarker(key, { icon = RED }) {
    const { markers } = this.state;
    const marker = markers[key];

    if (!marker) return;

    marker.setIcon(icon); // TODO this might not work
  }

  createMarker(key, { location, icon = RED }) {
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
      showMarker = false,
    } = this.props;

    const map = new google.maps.Map(document.getElementById(mapId), {
      center: location,
      zoom: 15,
      gestureHandling,
    });

    this.setState({
      map,
    }, () => {
      if (showMarker) {
        this.createMarker(-1, { location });
      }

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
  showMarker: false,
  activeMarker: null,
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
  showMarker: PropTypes.bool,
  activeMarker: PropTypes.string,
};
