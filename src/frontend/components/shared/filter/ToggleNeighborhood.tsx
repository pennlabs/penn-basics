import React from 'react'
import s from 'styled-components'
import { connect } from 'react-redux'

import {
  FOCUS_GRAY,
  LIGHT_GRAY,
  LIGHTER_BLUE,
  BLUE,
  MEDIUM_GRAY,
} from '../../../styles/colors'
import { filterOnCampus as setFilterOnCampus } from '../../../actions/spaces_actions'
import { ISpacesReducerState } from '../../../../types/studyspaces'

const HEIGHT = 0.875
const WIDTH = 2.25

const Wrapper = s.div``

interface IActiveProps {
  active?: boolean
}

const Label = s.span<IActiveProps>`
  display: inline-block;
  margin-bottom: 0;
  margin-left: 0.625rem;
  color: ${MEDIUM_GRAY};
  transition: all 0.2 ease;
  cursor: pointer;
  opacity: 0.6;

  ${({ active }): string =>
    active ? `opacity: 1; color: ${BLUE} !important;` : ''}
`

const ToggleWrapper = s.div`
  width: ${WIDTH}rem;
  position: relative;
  display: inline-block;
`

const Bar = s.div<IActiveProps>`
  transition: all 0.2s ease;
  width: 100%;
  height: ${HEIGHT}rem;
  border-radius: ${HEIGHT}rem;
  margin-top: ${-HEIGHT / 2}rem;
  display: inline-block;
  background: ${({ active }): string => (active ? LIGHTER_BLUE : FOCUS_GRAY)};
  cursor: pointer;
`

const Circle = s.div<IActiveProps>`
  transition: all 0.2s ease;
  height: ${HEIGHT + 0.4}rem;
  width: ${HEIGHT + 0.4}rem;
  border-radius: 100%;
  position: absolute;
  background: ${({ active }): string => (active ? BLUE : LIGHT_GRAY)};
  margin-left: ${({ active }): string =>
    active ? `${WIDTH - HEIGHT - 0.4}rem` : '0'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`

interface IToggleNeighborhoodProps {
  filterOnCampus?: boolean
  style?: React.CSSProperties
  filterOnCampusDispatch: (filter: boolean) => void
}

class ToggleNeighborhood extends React.Component<IToggleNeighborhoodProps, {}> {
  constructor(props: IToggleNeighborhoodProps) {
    super(props)
  }

  handleClick(e: React.MouseEvent<HTMLDivElement | HTMLSpanElement>): void {
    const { filterOnCampusDispatch, filterOnCampus } = this.props
    e.stopPropagation()
    filterOnCampusDispatch(!filterOnCampus)
  }

  render(): React.ReactElement {
    const { filterOnCampus, style } = this.props
    return (
      <Wrapper style={style || {}}>
        <ToggleWrapper>
          <Circle
            onClick={(e): void => this.handleClick(e)}
            active={filterOnCampus}
          />
          <Bar
            onClick={(e): void => this.handleClick(e)}
            active={filterOnCampus}
          />
        </ToggleWrapper>
        <Label
          onClick={(e): void => this.handleClick(e)}
          active={filterOnCampus}
        >
          Univ. City only
        </Label>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({
  spaces,
}: {
  spaces: ISpacesReducerState
}): ISpacesReducerState => spaces

// TODO
const mapDispatchToProps = (
  dispatch: any
): {
  filterOnCampusDispatch: (filter: boolean) => any
} => ({
  filterOnCampusDispatch: (filter: boolean): any =>
    dispatch(setFilterOnCampus(filter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleNeighborhood)
