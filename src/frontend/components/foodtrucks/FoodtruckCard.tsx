import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import s from 'styled-components'

import { Card, Subtitle, Subtext, FlexRow, Col, Circle } from '../shared'
import { setHoveredFoodtruck } from '../../actions/foodtrucks_action'
import { DARK_GRAY } from '../../styles/colors'
import { StarIcon } from '../shared/Icons'
import { IFoodTrucksReducerState } from '../../../types/foodtrucks'
// import { getNoiseLevel, getOutletsLevel } from './mapper'

const StyledLink = s.a`
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

interface IFoodtruckCardStateProps {
  hoveredFoodtruck?: string
}

interface IFoodtruckCardDispatchProps {
  dispatchSetHoveredFoodtruck: (foodtruckId: string) => void
}

interface IFoodtruckCardOwnProps {
  foodtruckId: string
  name: string
  open: boolean
  hours: string
  overallRating: number
  image: string
}

type IFoodtruckCardProps = IFoodtruckCardOwnProps &
  IFoodtruckCardStateProps &
  IFoodtruckCardDispatchProps

const FoodtruckCard: React.FC<IFoodtruckCardProps> = ({
  hoveredFoodtruck,
  foodtruckId,
  dispatchSetHoveredFoodtruck,
  name,
  open,
  hours,
  overallRating,
  image,
}) => {
  const handleMouseEnter = (): void => {
    // If there is no change to be made
    if (hoveredFoodtruck && hoveredFoodtruck === foodtruckId) {
      return
    }

    dispatchSetHoveredFoodtruck(foodtruckId)
  }

  return (
    <Link
      href={`/foodtrucks?id=${foodtruckId}`}
      as={`/foodtrucks/${foodtruckId}`}
    >
      <StyledLink>
        <Card padding="0.5rem 0.5rem 0.5rem 1rem" hoverable>
          <FlexRow>
            {image && (
              <Col backgroundImage={image} width="30%" borderRadius="4px" />
            )}
            <Col
              padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}
              onMouseEnter={handleMouseEnter}
            >
              <Content>
                <Subtitle marginBottom="0">{name}</Subtitle>

                <Subtext marginBottom="0">
                  {open
                    ? ` Open: ${hours}`
                    : String(hours).includes('null') ||
                      String(hours).includes('NaN')
                    ? 'Closed today'
                    : ` Closed • Opens at ${hours.substring(
                        0,
                        hours.indexOf('am')
                      )}am`}
                  {` • ${(Math.round(overallRating * 100) / 100).toFixed(2)}`}
                  &nbsp;
                  <StarIcon
                    style={{
                      transform: 'scale(0.7) translateY(10px) translateX(-3px)',
                      color: 'black',
                      fill: 'black',
                      opacity: '0.5',
                    }}
                  />
                  {/* {outletsLevel ? ` • ${outletsLevel}` : ''}
                  {noiseLevel ? ` • ${noiseLevel}` : ''} */}
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

const mapStateToProps = ({
  foodtrucks,
}: {
  foodtrucks: IFoodTrucksReducerState
}): IFoodtruckCardStateProps => {
  const { hoveredFoodtruck } = foodtrucks
  return { hoveredFoodtruck }
}

const mapDispatchToProps = (
  dispatch: (action: any) => any
): IFoodtruckCardDispatchProps => ({
  dispatchSetHoveredFoodtruck: (foodtruckId: string): void =>
    dispatch(setHoveredFoodtruck(foodtruckId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodtruckCard)
