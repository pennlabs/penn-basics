import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'

import { ISpacesReducerState } from 'src/frontend/reducers/spacesReducer'
import { TSpaceId, ISpaceWithHoursAndOpenAndSpaceId } from '../../../types/studyspaces'
import MobileToggleView from './MobileToggleView'
import SpaceCard from './SpaceCard'
import {
  Map,
  Row,
  Col,
  Scrollbar,
  Line,
  ErrorMessage,
  NoDataScroll,
} from '../shared'
import {
  NAV_HEIGHT,
  FILTER_HEIGHT,
  MOBILE_FILTER_HEIGHT,
} from '../../styles/sizes'
import { getAllSpacesData, setActiveSpace } from '../../actions/spaces_actions'
import Filter from '../shared/filter'
import SpaceModal from './SpaceModal'
import PennLabsCredit from '../shared/PennLabsCredit'
import { SNOW } from '../../styles/colors'
import {
  STUDYSPACE_QUERY_ROUTE,
  STUDYSPACE_ROUTE,
} from '../../constants/routes'

// TODO port this over to hooks

interface IStudySpacesAppProps {
  getAllSpacesDataDispatch: () => void
  setActiveSpaceDispatch: (id: TSpaceId) => void
  error?: string
  hoveredSpace?: string
  pending: boolean
  id: string
  spacesData?: Record<TSpaceId, ISpaceWithHoursAndOpenAndSpaceId>
  filteredSpacesData?: Record<TSpaceId, ISpaceWithHoursAndOpenAndSpaceId>
}

interface IStudySpacesAppState {
  isListViewMobile: boolean
  googleMapError: string
}

class StudySpacesApp extends React.Component<
  IStudySpacesAppProps,
  IStudySpacesAppState
> {
  constructor(props: IStudySpacesAppProps) {
    super(props)
    this.state = { googleMapError: '', isListViewMobile: true }
    this.toggleView = this.toggleView.bind(this)
  }

  componentDidMount() {
    const { getAllSpacesDataDispatch } = this.props
    getAllSpacesDataDispatch()
  }

  componentDidUpdate(prevProps: IStudySpacesAppProps) {
    /**
     * Handle when the user re-navigates to this page, in which case the component updates
     * and the props are wiped BUT the component does not re-mounts
     *
     * We solve this by checking if the new props lack necessary data, but the old props
     * did have that data. If this is the case, we request the data again.
     */
    const {
      spacesData: currentSpacesData,
      getAllSpacesDataDispatch,
    } = this.props
    const { spacesData: prevSpacesData } = prevProps
    if (!currentSpacesData && prevSpacesData) {
      getAllSpacesDataDispatch()
    }
  }

  toggleView() {
    const { isListViewMobile } = this.state
    this.setState({ isListViewMobile: !isListViewMobile })
  }

  render() {
    const { filteredSpacesData, error, pending, hoveredSpace, id } = this.props

    const parsedSpaceId = null || id

    const { googleMapError, isListViewMobile } = this.state

    // TODO loading spinner
    if (pending || !filteredSpacesData) {
      return <Filter />
    }

    const areFilteredSpacesResults = Boolean(
      Object.keys(filteredSpacesData).length
    )

    return (
      <>
        <MobileToggleView
          isListView={isListViewMobile}
          toggle={this.toggleView}
        />

        <Filter />

        <Row
          maxHeight={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
          style={{ background: SNOW }}
        >
          <Scrollbar
            padding="0 0 .5rem 0"
            sm={12}
            md={6}
            lg={4}
            height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
            hideOnMobile={!isListViewMobile}
          >
            {error && <ErrorMessage message={error} />}
            
            {!areFilteredSpacesResults && (
              <NoDataScroll
                image="/img/studyspace-empty-state.svg"
                imageAlt="Empty Studyspaces"
                text="No study spaces match your criteria"
              />
            )}

            {Object.keys(filteredSpacesData).map(spaceId => {
              const space = filteredSpacesData[spaceId]
              return (
                <React.Fragment key={spaceId}>
                  <SpaceCard spaceId={spaceId} {...space} />
                  <Line />
                </React.Fragment>
              )
            })}

            <PennLabsCredit />
          </Scrollbar>
          <Col sm={12} md={6} lg={8} hideOnMobile={isListViewMobile}>
            <ErrorMessage message={googleMapError} />
            {!googleMapError && (
              <Map
                mapId="map"
                height={`calc(100vh - ${NAV_HEIGHT} - ${FILTER_HEIGHT})`}
                mobileHeight={`calc(100vh - ${NAV_HEIGHT} - ${MOBILE_FILTER_HEIGHT})`}
                markers={filteredSpacesData}
                activeMarker={hoveredSpace}
                handleClickMarker={spaceId =>
                  Router.push(
                    STUDYSPACE_QUERY_ROUTE(`${spaceId}`),
                    STUDYSPACE_ROUTE(`${spaceId}`)
                  )
                }
              />
            )}
          </Col>
        </Row>

        <SpaceModal spaceId={parsedSpaceId} />
      </>
    )
  }
}

const mapStateToProps = ({ spaces }: { spaces: ISpacesReducerState }) => spaces

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  getAllSpacesDataDispatch: () => dispatch(getAllSpacesData()),
  setActiveSpaceDispatch: (id: TSpaceId) => dispatch(setActiveSpace(id)),
})

// Redux config
export default connect(mapStateToProps, mapDispatchToProps)(StudySpacesApp)
