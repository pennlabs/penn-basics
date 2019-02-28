/* global google, document */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SHOW_MARKER_KEY = -1; // Marker keys which we shouldn't delete
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
    this.updateMarkers = this.updateMarkers.bind(this);
  }

  componentDidMount() {
    this.waitForGoogle();
  }

  componentDidUpdate(prevProps) {
    // Check if the active marker changes
    const { activeMarker } = this.props;
    const oldActiveMarker = prevProps.activeMarker;

    if (activeMarker !== oldActiveMarker) {
      this.updateMarker(oldActiveMarker, { icon: RED });
      this.updateMarker(activeMarker, { icon: BLUE });
    }

    // Check if the data changed and update markers
    const { markers } = this.props;

    if (markers !== prevProps.markers) {
      this.updateMarkers();
    }
  }

  updateMarkers() {
    return new Promise((resolve) => {
      const { markers: dataMarkers = {} } = this.props;
      const { markers: mapMarkers = {} } = this.state;

      const dataKeys = Object.keys(dataMarkers);
      const mapKeys = Object.keys(mapMarkers);

      mapKeys.forEach((key) => {
        if (!dataKeys[key] && key !== SHOW_MARKER_KEY) {
          // Delete the marker on the map and remove it from the object
          const marker = mapMarkers[key];
          marker.setMap(null);
          delete mapMarkers[key];
        }
      });

      dataKeys.forEach((key) => {
        if (!mapKeys[key]) {
          // Create a marker new marker and add it to the state
          const marker = this.createMarker(key, dataMarkers[key]);
          mapMarkers[key] = marker;
        }
      });

      // Update the state
      this.setState({
        markers: mapMarkers,
      }, () => {
        resolve(true);
      });
    });
  }

  updateMarker(key, { icon = RED }) {
    const { markers } = this.state;
    const marker = markers[key];

    if (!marker) return;

    marker.setIcon(icon); // TODO this might not work
  }

  createMarker(key, { location, icon = RED }) {
    if (!location) {
      console.log('Location is undefined'); // eslint-disable-line no-console

      return null;
    }

    const { lat, lng } = location;

    if (typeof lat === 'undefined' || typeof lng === 'undefined') {
      console.log('Lat or lng is undefined'); // eslint-disable-line no-console

      return null;
    }

    const { map } = this.state;

    if (!map) {
      console.log('Map is undefined'); // eslint-disable-line no-console

      return null;
    }

    const marker = new google.maps.Marker({
      position: location,
      icon,
      map,
    });

    return marker;
  }

  initMap() {
    const {
      location,
      mapId = 'map',
      gestureHandling = '',
      showMarker = false,
    } = this.props;

    const map = new google.maps.Map(document.getElementById(mapId), {
      center: location,
      zoom: 15,
      gestureHandling,
      mapTypeControlOptions: {
        mapTypeIds: [],
      },
    });

    this.setState({
      map,
    }, () => {
      this.updateMarkers()
        .then(() => {
          if (showMarker) {
            const marker = this.createMarker(SHOW_MARKER_KEY, { location });

            const { markers } = this.state;
            const newMarkers = Object.assign({}, markers, {
              SHOW_MARKER_KEY: marker,
            });
            markers[SHOW_MARKER_KEY] = marker;

            this.setState({ markers: newMarkers }, () => {
              console.log(this.state.markers); // eslint-disable-line
            });
          }
        });
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