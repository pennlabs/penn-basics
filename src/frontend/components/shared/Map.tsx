/* global google, document */
import React from 'react'
import styled from 'styled-components'
import { ILocation } from '../../../types/studyspaces'
import { maxWidth, PHONE } from '../../styles/sizes'

// Styles
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

// Interfaces
type TMarkerId = number | string

interface IMapProps {
  location?: ILocation
  handleClickMarker: (id: TMarkerId) => void
  height?: string
  mobileHeight?: string
  mapId: string
  gestureHandling?: 'auto' | 'none' | 'cooperative' | 'greedy' | undefined
  markers?: Record<TMarkerId, any> // TODO
  showMarker?: boolean
  activeMarker?: TMarkerId
}

interface IMapState {
  markers: Record<TMarkerId, any> // TODO
  map: any // TODO
}

// Constants
const SHOW_MARKER_KEY: TMarkerId = -1 // Marker keys which we shouldn't delete
const RED_ICON = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
const BLUE_ICON = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'

/**
 * Wrapper on the Google Maps map rendering engine
 *
 * @property `height` of the map. NOTE this should not be in `%` terms
 *                    unless there is a relatively positioned parent above the
 *                    map. It's generally safer to use `vh`
 */
export class Map extends React.Component<IMapProps, IMapState> {
  constructor(props: IMapProps) {
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

  componentDidUpdate(prevProps: IMapProps) {
    // Check if the active marker changes
    const { activeMarker } = this.props
    const oldActiveMarker = prevProps.activeMarker

    if (activeMarker !== oldActiveMarker) {
      if (oldActiveMarker !== undefined) {
        this.updateMarker(oldActiveMarker, { icon: RED_ICON })
      }
      if (activeMarker !== undefined) {
        this.updateMarker(activeMarker, { icon: BLUE_ICON })
      }
    }

    // Check if the data changed and update markers
    const { markers = {} } = this.props

    if (markers !== prevProps.markers) {
      this.updateMarkers()
    }
  }

  updateMarkers() {
    return new Promise(resolve => {
      const { markers: dataMarkers } = this.props
      const { markers: mapMarkers } = this.state

      if (!dataMarkers || !mapMarkers) {
        return resolve()
      }

      // Some type massaging
      const dataKeysUnknown: unknown = Object.keys(dataMarkers)
      const dataKeys = dataKeysUnknown as TMarkerId[]
      const mapKeysUnknown: unknown = Object.keys(mapMarkers)
      const mapKeys = mapKeysUnknown as TMarkerId[]

      mapKeys.forEach((key: TMarkerId) => {
        if (!dataMarkers[key] && key !== SHOW_MARKER_KEY) {
          // Delete the marker on the map and remove it from the object
          const marker = mapMarkers[key]
          marker.setMap(null)
          delete mapMarkers[key]
        }
      })

      dataKeys.forEach(key => {
        if (!mapMarkers[key]) {
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

  updateMarker(key: TMarkerId, { icon = RED_ICON }) {
    const { markers } = this.state
    const marker = markers[key]

    if (!marker) {return}

    marker.setIcon(icon) // TODO this might not work
  }

  createMarker(
    key: TMarkerId,
    { location, icon = RED_ICON }: { location: ILocation; icon?: string }
  ) {
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
      icon,
      // icon: {url: RED_ICON, scaledSize: new google.maps.Size(20,33)},
      map,
    })

    if (handleClickMarker) {
      marker.addListener('click', () => handleClickMarker(key))
    }

    return marker
  }

  initMap() {
    const {
      location = {
        lat: 39.9522,
        lng: -75.1932,
      },
      mapId = 'map',
      gestureHandling,
      showMarker = false,
    } = this.props

    const mapDOMNode = document.getElementById(mapId)

    if (!mapDOMNode) {
      throw new Error('Failed to find map with id "' + mapId + '"')
    }

    const map = new google.maps.Map(mapDOMNode, {
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
