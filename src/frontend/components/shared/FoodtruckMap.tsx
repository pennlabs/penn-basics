/* global google, document */
import React, { Component } from 'react'
import styled from 'styled-components'

import { maxWidth, PHONE } from '../../styles/sizes'

const SHOW_MARKER_KEY = -1 // Marker keys which we shouldn't delete
const RED = '/img/foodtrucks/food-pin-red.png'
const BLUE = '/img/foodtrucks/food-pin-blue.png'

interface IMapWrapper {
  height?: string
  mobileHeight?: string
}

const MapWrapper = styled.div<IMapWrapper>`
  width: 100%;
  flex: 1;
  height: ${({ height }) => height || '100vh'};

  ${maxWidth(PHONE)} {
    height: ${({ mobileHeight, height }) => mobileHeight || height || '100vh'};
  }
`

type TMarkerId = number

interface IFoodTruckMapProps {
  location: {
    lat: number
    lng: number
  }
  handleClickMarker: () => void
  height?: string
  mobileHeight?: string
  mapId: string
  gestureHandling?: string
  markers: Record<TMarkerId, any>
  showMarker?: boolean
  activeMarker?: TMarkerId
}

interface IFoodTruckMapState {
  markers: Record<TMarkerId, any>
  map: object
}

export class FoodtruckMap extends Component<
  IFoodTruckMapProps,
  IFoodTruckMapState
> {
  constructor(props: IFoodTruckMapProps) {
    super(props)

    this.state = {
      map: null,
      markers: {},
    }

    this.waitForGoogle = this.waitForGoogle.bind(this)
    this.createMarker = this.createMarker.bind(this)
    this.updateMarkers = this.updateMarkers.bind(this)
  }

  componentDidMount() {
    this.waitForGoogle()
  }

  componentDidUpdate(prevProps: IFoodTruckMapProps) {
    // Check if the active marker changes
    const { location } = this.props
    if (prevProps.location !== location) {
      this.waitForGoogle()
      return
    }
    const { activeMarker } = this.props
    const oldActiveMarker = prevProps.activeMarker

    if (activeMarker !== oldActiveMarker) {
      this.updateMarker(oldActiveMarker, { icon: RED })
      this.updateMarker(activeMarker, { icon: BLUE })
    }

    // Check if the data changed and update markers
    const { markers } = this.props

    if (markers !== prevProps.markers) {
      this.updateMarkers()
    }
  }

  updateMarkers() {
    return new Promise(resolve => {
      const { markers: dataMarkers = {} } = this.props // curr markers
      const { markers: mapMarkers = {} } = this.state // old markers

      const dataKeys = Object.keys(dataMarkers)
      const mapKeys = Object.keys(mapMarkers)

      mapKeys.forEach(key => {
        if (!dataKeys.includes(key) && key !== SHOW_MARKER_KEY) {
          // Delete the marker on the map and remove it from the object
          const marker = mapMarkers[key]
          marker.setMap(null)
          delete mapMarkers[key]
        }
      })

      dataKeys.forEach(key => {
        if (!mapKeys.includes(key)) {
          // Create a marker new marker and add it to the state
          const marker = this.createMarker(key, dataMarkers[key])
          mapMarkers[key] = marker
        }
      })

      // Update the state
      this.setState(
        {
          markers: mapMarkers,
        },
        () => {
          resolve(true)
        }
      )
    })
  }

  updateMarker(key, { icon = RED }) {
    const { markers } = this.state
    const marker = markers[key]

    if (!marker) return

    marker.setIcon({ url: icon, scaledSize: new google.maps.Size(20, 34) })
  }

  createMarker(key, { location }) {
    const { handleClickMarker } = this.props

    if (!location) {
      console.log('Location is undefined') // eslint-disable-line no-console

      return null
    }

    const { lat, lng } = location

    if (typeof lat === 'undefined' || typeof lng === 'undefined') {
      console.log('Lat or lng is undefined') // eslint-disable-line no-console

      return null
    }

    const { map } = this.state

    if (!map) {
      console.log('Map is undefined') // eslint-disable-line no-console

      return null
    }

    const marker = new google.maps.Marker({
      position: location,
      icon: { url: RED, scaledSize: new google.maps.Size(20, 34) },
      map,
    })

    if (handleClickMarker) {
      marker.addListener('click', () => handleClickMarker(key))
    }

    return marker
  }

  initMap() {
    const {
      location,
      mapId = 'map',
      gestureHandling = '',
      showMarker = false,
    } = this.props

    const map = new google.maps.Map(document.getElementById(mapId), {
      center: location,
      zoom: 15,
      gestureHandling,
      streetViewControl: false, // Disable street view button + orange dude
      fullscreenControl: false, // Disable full screen button
      zoomControl: false, // Disable zoom buttons
      mapTypeControlOptions: {
        mapTypeIds: [],
      },
    })

    this.setState(
      {
        map,
      },
      () => {
        this.updateMarkers().then(() => {
          if (showMarker) {
            const marker = this.createMarker(SHOW_MARKER_KEY, { location })

            const { markers } = this.state
            const newMarkers = Object.assign({}, markers, {
              SHOW_MARKER_KEY: marker,
            })
            markers[SHOW_MARKER_KEY] = marker

            this.setState({ markers: newMarkers })
          }
        })
      }
    )
  }

  waitForGoogle() {
    if (typeof google !== 'undefined') {
      this.initMap()
    } else {
      // Check again if google is defined
      setTimeout(this.waitForGoogle, 125)
    }
  }

  render() {
    const { height, mobileHeight, mapId } = this.props

    return <MapWrapper height={height} mobileHeight={mobileHeight} id={mapId} />
  }
}

FoodtruckMap.defaultProps = {
  location: {
    lat: 39.9522,
    lng: -75.1932,
  },
  height: undefined,
  mobileHeight: undefined,
  gestureHandling: '',
  markers: {},
  showMarker: false,
  activeMarker: null,
  handleClickMarker: null,
}
