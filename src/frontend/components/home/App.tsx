import React, { useState } from 'react';
import s from 'styled-components'
import { connect } from 'react-redux'

import { Row, Col, Button } from '../shared'
//import Modal from '../shared/Modal'
//import Button from '../shared/Button'
import PennLabsCredit from '../shared/PennLabsCredit'
import { maxWidth, PHONE, TABLET } from '../../styles/sizes'

import Filter from './Filter/Filter'
//import Greeting from './Greeting'
import Weather from './Weather'
import News from './News'
import Dining from './Dining'
import Laundry from './Laundry'
import ExternalLinks from './ExternalLinks'
import Quotes from './Quotes'
import Events from './Events'

/*import {
  //FilterBtnWrapper,
  //OptionsModalBacking,
  //OptionsModalWrapper,
  Option,
  Circle,
  OptionText,
} from '../shared/Option'*/

/*import {
  filterHomeCustomize,
  toggleHomeCustomize,
  initializeFilterHome,
} from '../../actions/home_actions'*/

const Wrapper = s.div`
  padding-top: 1rem;
  padding-left: calc(2rem + 1.25vw);
  padding-right: calc(2rem + 1.25vw);

  ${maxWidth(TABLET)} {
    padding: 1rem;
  }

  ${maxWidth(PHONE)} {
    padding: 0.5rem;
  }
`


const Home = ({ filterList }: { filterList: number[] },
  //dispatchFilterHomeCustomize: any,
  //dispatchToggleHomeCustomize,
  //dispatchInitializeFilterHome,
  //filterCustomizeActive
  ) => {
  const componentList = [
    <Weather key="weatherComponent" />,
    <Events key="eventsComponent" />,
    <News key="newsComponent" />,
    <Laundry key="laundryComponent" />,
    <Dining key="diningComponent" />,
    <Quotes key="quotesComponent" />,
  ]

  //const options = ['Weather', 'Events', 'News', 'Laundry', 'Dining', 'Quotes'];

  const [show, setShow] = useState(true);

  return (
    <>
      <Wrapper>
        <Row margin="0.5rem">
          <Col sm={12} lg={8} margin="0.5rem">
            {/* <Greeting /> */}
            {filterList.map(filter => componentList[filter])}
          </Col>

          {/* Overflow visible so customize this page filter dropdown works */}
          <Col sm={12} lg={4} style={{ overflow: 'visible' }} margin="0.5rem">
            <ExternalLinks />

            <Button onClick={() => setShow(!show)}>Filter</Button>
            {/*
            <Modal show={show} toggle={() => setShow(!show)}>
              {options.map((o, idx) => {
                const isActiveOption = Boolean(
                  filterList && filterList.includes(idx)
                )

                return (
                  <Option
                    key={o}
                    onClick={() => dispatchFilterHomeCustomize(idx)}
                    role="option"
                    tabIndex={0}
                    aria-selected={isActiveOption}
                    onKeyPress={e => this.handleOptionKeyPress(e, idx)}
                  >
                    <Circle active={isActiveOption} />
                    <OptionText active={isActiveOption}>{o}</OptionText>
                  </Option>
                )
              })}
            </Modal>
            */}

            <Filter />
          </Col>
        </Row>
      </Wrapper>
      <Wrapper>
        <PennLabsCredit padding="0 0 1rem 0" />
      </Wrapper>
    </>
  )
}

const mapStateToProps = ({ home }) => {
  const { filterList } = home
  return { filterList }
}

/*const mapDispatchToProps = dispatch => ({
  dispatchFilterHomeCustomize: filter => dispatch(filterHomeCustomize(filter)),
  dispatchToggleHomeCustomize: () => dispatch(toggleHomeCustomize()),
  dispatchInitializeFilterHome: optionsLength =>
    dispatch(initializeFilterHome(optionsLength)),
})*/

export default connect(mapStateToProps)(Home)
