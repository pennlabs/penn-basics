import React from 'react';
import { Route, Switch } from 'react-router-dom';
import s from 'styled-components'

import { BLUE, DARK_BLUE } from '../styles/colors'

// Shared components
import Nav from './shared/Nav'
// import Sidebar from './shared/sidebar/Sidebar'; /* TODO */

// Page components
import Home from './home/App'
import NotFound from './shared/NotFound'
import Dining from './dining/App'
import DiningVenue from './dining/DiningVenue'
import Laundry from './laundry/App'
import LaundryVenue from './laundry/LaundryVenue'
import StudySpaces from './studyspaces/App'
import StudySpacesVenue from './studyspaces/StudySpacesVenue'
import Reservations from './reservations/App'

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
    <Nav />
    <div id="wrapper">

      <div id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dining" component={Dining} />
          <Route exact path="/dining/:id" component={DiningVenue} />
          <Route exact path="/laundry" component={Laundry} />
          <Route exact path="/laundry/:id" component={LaundryVenue} />
          <Route exact path="/studyspaces" component={StudySpaces} />
          <Route exact path="/studyspaces/:id" component={StudySpacesVenue} />
          <Route exact path="/reservations" component={Reservations} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
  </App>
);
