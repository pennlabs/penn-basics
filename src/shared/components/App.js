// Import frameworks
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import components
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';

// Import page components
import Home from './home/App';
import NotFound from './shared/NotFound';
import Dining from './dining/App';
import DiningVenue from './dining/DiningVenue';
import Laundry from './laundry/App';
import LaundryVenue from './laundry/LaundryVenue';
import StudySpaces from './studyspaces/App';
import StudySpacesVenue from './studyspaces/StudySpacesVenue';
import Reservations from './reservations/App';

export default () => (
  <div>
    <Nav />
    <div id="wrapper">
      <Switch>
        {/* Render the sidebar on all pages except the homepage */}
        <Route exact path="/:anything_but_home" component={Sidebar} />
        <Route exact path="/:anything_but_home/*" component={Sidebar} />
      </Switch>
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
    <Footer />
  </div>
);
