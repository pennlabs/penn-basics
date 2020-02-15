import React, { Component } from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'

import BellIcon from '../../../../public/img/bell.svg'
import MachineAvailability from './MachineAvailability'
import {
  BorderedCard,
  Row,
  Col,
  Subtext,
  NoData,
  ErrorMessage,
} from '../shared'
import NotFound from '../shared/NotFound'

import FavoriteButton from '../shared/favorites/FavoriteButton'
import {
  addFavorite,
  removeFavorite,
  getLaundryHall,
  getReminders,
  addReminder,
  removeReminder,
} from '../../actions/laundry_actions'
import { isValidNumericId } from '../../../utils/helperFunctions'
import { maxWidth, PHONE } from '../../styles/sizes'
import {
  IFavorite,
  ILaundryHallInfo,
  ILaundryReducerState,
  IReminder,
} from '../../../types/laundry'
import Loading from '../shared/Loading'

const MARGIN = '0.5rem'

const Wrapper = s.div`
  padding: 1rem;
`

const Buttons = s.div`
  float: right;

  ${maxWidth(PHONE)} {
    float: none;
    width: 100%;
    margin-bottom: 1rem;

    .button {
      width: 100%;
    }
  }
`

interface IAddFavoriteInput {
  hallURLId: number
  location: string
  hallName: string
}

interface IRemoveFavoriteInput {
  hallURLId: number
}

interface ILaundryVenueDispatchProps {
  dispatchGetLaundryHall: (hallId: number, intervalID: number) => void
  dispatchGetReminders: () => void
  dispatchAddFavorite: ({
    hallURLId,
    location,
    hallName,
  }: IAddFavoriteInput) => void
  dispatchRemoveFavorite: ({ hallURLId }: IRemoveFavoriteInput) => void
  dispatchAddReminder: (
    machineID: number,
    hallID: number,
    machineType: string,
    timeRemaining: number
  ) => void
  dispatchRemoveReminder: () => void
}

interface ILaundryVenueReduxProps {
  hallIntervalID: number
  reminderIntervalID: number
  error: string
  browserError: string
  laundryHallInfo: ILaundryHallInfo
  favorites: IFavorite[]
  reminders: IReminder[]
  pending: boolean
}

interface ILaundryVenueOwnProps {
  hallURLId: number
}

type ILaundryVenueProps = ILaundryVenueReduxProps &
  ILaundryVenueDispatchProps &
  ILaundryVenueOwnProps

class LaundryVenue extends Component<ILaundryVenueProps> {
  static renderNoHall(): React.ReactElement {
    // TODO store image locally
    return (
      <NoData
        image="/img/laundry.png"
        imageAlt="Laundry machine"
        text="Select a laundry hall to see information"
      />
    )
  }

  componentDidMount(): void {
    const {
      hallURLId,
      hallIntervalID,
      dispatchGetLaundryHall,
      dispatchGetReminders,
    } = this.props

    const isValidHallURLId = isValidNumericId(hallURLId)
    if (isValidHallURLId) {
      dispatchGetLaundryHall(hallURLId, hallIntervalID)
    }

    dispatchGetReminders()
  }

  componentDidUpdate(prevProps: ILaundryVenueProps): void {
    const { dispatchGetLaundryHall, hallURLId, hallIntervalID } = this.props

    if (!isValidNumericId(hallURLId)) {
      return
    }

    const prevHallURLId = prevProps.hallURLId

    if (prevHallURLId !== hallURLId) {
      dispatchGetLaundryHall(hallURLId, hallIntervalID)
    }
  }

  componentWillUnmount(): void {
    // clear the interval when another component is rendered
    const { hallIntervalID, reminderIntervalID } = this.props
    clearInterval(hallIntervalID)
    clearInterval(reminderIntervalID)
  }

  render(): React.ReactElement {
    const {
      pending,
      error,
      browserError,
      laundryHallInfo,
      favorites,
      hallURLId,
      reminders,
      dispatchAddFavorite,
      dispatchRemoveFavorite,
      dispatchAddReminder,
      dispatchRemoveReminder,
    } = this.props

    if (!isValidNumericId(hallURLId) || !laundryHallInfo) {
      return LaundryVenue.renderNoHall()
    }

    if (hallURLId < 0 || hallURLId > 52) {
      return (
        <Wrapper>
          <NotFound />
        </Wrapper>
      )
    }

    if (pending) {
      return <Loading />
    }

    const isFavorited = favorites.some(({ hallId }) => hallId === hallURLId)

    const { hall_name: hallName, location } = laundryHallInfo
    const { washers, dryers, details: machines } = laundryHallInfo.machines
    const enableReminder = !browserError

    return (
      <Wrapper>
        <ErrorMessage message={browserError} />
        <ErrorMessage message={error} />

        <div style={{ marginBottom: '1rem' }}>
          <Buttons>
            <FavoriteButton
              isFavorited={isFavorited}
              addFunction={(props): void =>
                dispatchAddFavorite(props as IAddFavoriteInput)
              }
              removeFunction={(props): void =>
                dispatchRemoveFavorite(props as IRemoveFavoriteInput)
              }
              addParams={{ hallURLId, location, hallName }}
              removeParams={{ hallURLId }}
            />
            {browserError || reminders.length === 0 ? null : (
              <span // eslint-disable-line
                className="button"
                style={{ marginLeft: '0.5rem' }}
                onClick={(): void => dispatchRemoveReminder()}
              >
                Remove Reminders
              </span>
            )}
          </Buttons>

          <h1 className="title">{hallName}</h1>
        </div>

        <Row margin={MARGIN}>
          <Col lg={6} sm={12} margin={MARGIN}>
            <BorderedCard>
              <p className="title is-4">Washers</p>
              <MachineAvailability
                displayDetails
                machineData={washers}
                machineType="washer"
                allMachines={machines}
                laundryHallId={hallURLId}
                reminders={reminders}
                dispatchAddReminder={dispatchAddReminder}
                enableReminder={enableReminder}
              />
            </BorderedCard>
          </Col>

          <Col lg={6} sm={12} margin={MARGIN}>
            <BorderedCard>
              <p className="title is-4">Dryers</p>
              <MachineAvailability
                displayDetails
                machineData={dryers}
                machineType="dryer"
                allMachines={machines}
                laundryHallId={hallURLId}
                reminders={reminders}
                dispatchAddReminder={dispatchAddReminder}
                enableReminder={enableReminder}
              />
            </BorderedCard>
          </Col>
        </Row>

        {enableReminder && (
          <Subtext>
            <span>
              <BellIcon style={{ transform: 'scale(0.7) translateY(10px)' }} />
            </span>
            &nbsp; Click the bell icon to send you a reminder when that machine
            is done running.
          </Subtext>
        )}
      </Wrapper>
    )
  }
}

const mapStateToProps = ({
  laundry,
}: {
  laundry: ILaundryReducerState
}): ILaundryVenueReduxProps => {
  const {
    error,
    browserError,
    laundryHallInfo,
    pending,
    // laundryHalls,
    favorites,
    reminders,
    hallIntervalID,
    reminderIntervalID,
  } = laundry

  return {
    error,
    browserError,
    laundryHallInfo,
    pending,
    // laundryHalls,
    favorites,
    reminders,
    hallIntervalID,
    reminderIntervalID,
  }
}

const mapDispatchToProps = (
  dispatch: (action: any) => any
): ILaundryVenueDispatchProps => ({
  dispatchAddFavorite: ({
    hallURLId,
    location,
    hallName,
  }: IAddFavoriteInput): void =>
    dispatch(addFavorite(hallURLId, location, hallName)),
  dispatchRemoveFavorite: ({ hallURLId }: IRemoveFavoriteInput): void =>
    dispatch(removeFavorite(hallURLId)),
  dispatchGetLaundryHall: (hallId: number, intervalID: number): void =>
    dispatch(getLaundryHall(hallId, intervalID)),
  dispatchAddReminder: (
    machineID: number,
    hallID: number,
    machineType: string,
    timeRemaining: number
  ): void =>
    dispatch(addReminder(machineID, hallID, machineType, timeRemaining)),
  dispatchRemoveReminder: (): void => dispatch(removeReminder()),
  dispatchGetReminders: (): void => dispatch(getReminders()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LaundryVenue)
