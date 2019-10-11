/* global window */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import s from 'styled-components'
import { MobileView, BrowserView } from 'react-device-detect'

import { BLUE, DARK_BLUE } from '../styles/colors'
import { initGA, logPageView } from '../analytics/index'

import Nav from './shared/Nav'
import Home from './home/App'
import NotFound from './shared/NotFound'
import Dining from './dining/App'
import Laundry from './laundry/App'
import StudySpaces from './studyspaces/App'
import Reservations from './reservations/App'
import Mobile from './mobile/App'
import Feedback from './shared/Feedback'

const AppWrapper = s.div`
  a {
    color: ${BLUE};

    &:visited {
      color: ${BLUE};
    }

    &:hover,
    &:focus,
    &:active {
      color: ${DARK_BLUE};
    }
  }
`

export default class App extends Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  componentDidUpdate() {
    logPageView()
  }

  render() {
    return (
      <AppWrapper>
        <MobileView>
          <div id="wrapper">
            <div id="app">
              <Mobile />
            </div>
          </div>
        </MobileView>

        <BrowserView>
          <Nav />
          <Feedback />
          <div id="wrapper">
            <div id="app">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dining" component={Dining} />
                <Route exact path="/dining/:id" component={Dining} />
                <Route exact path="/laundry" component={Laundry} />
                <Route exact path="/laundry/:id" component={Laundry} />
                <Route exact path="/studyspaces" component={StudySpaces} />
                <Route exact path="/reservations" component={Reservations} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserView>
      </AppWrapper>
    )
  }
}
