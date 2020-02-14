import React, { Component } from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'
import Link from 'next/link'

import { ISpacesReducerState } from 'src/frontend/reducers/spacesReducer'
import { Dispatch } from 'redux'
import { ISpaceWithHoursAndOpenAndSpaceId, TSpaceId } from 'src/types'
import {
  Card,
  Subtitle,
  Subtext,
  Col,
  Circle,
  FlexRow,
  StyledLink,
} from '../shared'
import { setHoveredSpace, setActiveSpace } from '../../actions/spaces_actions'
import { getNoiseLevel, getOutletsLevel } from './mapper'

const Content = s.div`
  width: 100%;
  position: relative;
  overflow-x: visible;
  padding-right: 0.5rem;
`

// SpaceCard.propTypes = {
//   name: PropTypes.string.isRequired,
//   open: PropTypes.bool,
//   image: PropTypes.string,
//   outlets: PropTypes.number,
//   quiet: PropTypes.number,
//   hours: PropTypes.string.isRequired,
//   hoveredSpace: PropTypes.string,
//   spaceId: PropTypes.string.isRequired,
//   setHoveredSpaceDispatch: PropTypes.func.isRequired,
//   setActiveSpaceDispatch: PropTypes.func.isRequired,
// }

type ISpaceCardProps = Partial<ISpaceWithHoursAndOpenAndSpaceId> & {
  hoveredSpace?: TSpaceId
  spaceId: TSpaceId
  setHoveredSpaceDispatch: (id: TSpaceId) => void
  setActiveSpaceDispatch: (id: TSpaceId) => void
}

class SpaceCard extends Component<ISpaceCardProps, {}> {
  constructor(props: ISpaceCardProps) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
  }

  handleKeyPress(event: React.KeyboardEvent): void {
    // TODO make this a constant / helper function
    if (event.keyCode === 32) {
      this.handleClick()
    }
  }

  handleMouseEnter(): void {
    const { hoveredSpace, spaceId, setHoveredSpaceDispatch } = this.props

    // If there is no change to be made
    if (hoveredSpace === spaceId) {return}

    setHoveredSpaceDispatch(spaceId)
  }

  handleClick(): void {
    const { setActiveSpaceDispatch, spaceId } = this.props
    setActiveSpaceDispatch(spaceId)
  }

  render() {
    const { name, open, image, quiet, outlets, hours, spaceId } = this.props

    const noiseLevel: string = quiet === undefined ? '' : getNoiseLevel(quiet)
    const outletsLevel: string =
      outlets === undefined ? '' : getOutletsLevel(outlets)

    return (
      <Link href={`/studyspaces?id=${spaceId}`} as={`/studyspaces/${spaceId}`}>
        <StyledLink>
          <Card
            onClick={this.handleClick}
            onKeyPress={this.handleKeyPress}
            padding="0.5rem 0.5rem 0.5rem 1rem"
            hoverable
          >
            <FlexRow>
              {image && (
                <Col backgroundImage={image} width="30%" borderRadius="4px" />
              )}
              <Col
                padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}
                onMouseEnter={this.handleMouseEnter}
              >
                <Content>
                  <Subtitle marginBottom="0">{name}</Subtitle>

                  <Subtext marginBottom="0">
                    {!hours
                      ? ''
                      : open
                      ? `Open: ${hours}`
                      : `Closed • Opens at ${hours.substring(
                          0,
                          hours.indexOf('am')
                        )}am`}
                    {outletsLevel ? ` • ${outletsLevel}` : ''}
                    {noiseLevel ? ` • ${noiseLevel}` : ''}
                  </Subtext>

                  <Circle open={open} />
                </Content>
              </Col>
            </FlexRow>
          </Card>
        </StyledLink>
      </Link>
    )
  }
}

const mapStateToProps = ({ spaces }: { spaces: ISpacesReducerState }) => {
  const { hoveredSpace } = spaces
  return { hoveredSpace }
}

// TODO fix types in redux
const mapDispatchToProps = (dispatch: (action: any) => Dispatch<TSpaceId>) => ({
  setHoveredSpaceDispatch: (spaceId: TSpaceId) =>
    dispatch(setHoveredSpace(spaceId)),
  setActiveSpaceDispatch: (spaceId: TSpaceId) =>
    dispatch(setActiveSpace(spaceId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceCard)
