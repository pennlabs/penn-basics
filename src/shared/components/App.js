import React from 'react';
import { Route, Switch } from 'react-router-dom';
import s from 'styled-components'
import { MobileView, BrowserView } from 'react-device-detect'


import { BLUE, DARK_BLUE } from '../styles/colors'


// import Sidebar from './shared/sidebar/Sidebar'; /* TODO */
import Nav from './shared/Nav/index'


import Home from './home/App'
import NotFound from './shared/NotFound'
import Dining from './dining/DiningVenue'
import Laundry from './laundry/App'
import StudySpaces from './studyspaces/App'
import Reservations from './reservations/App'
import Mobile from './mobile/App'


const App = s.div`
  a {
    color: ${BLUE};

    &:hover,
    &:focus,
    &:active,
    &:visited {
      color: ${DARK_BLUE};
    }
  }
`

export default () => (
  <App>
    <MobileView>
      <div id="wrapper">
        <div id="app">
          <Mobile />
        </div>
      </div>
    </MobileView>

    <BrowserView>
      <Nav />
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
  </App>
);
