import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';
import Card from './shared/card/Card';
import NotFound from './shared/NotFound';

// const NotFound = () => (
//   <div>
//     <h1 className="is-size-3 medium-gray-text">404: Content not found</h1>
//     <p>
//       It seems like the content you are looking for was either moved or does not exist.
//     </p>
//     <a href="/" className="btn marg-top-1">Back to home</a>
//   </div>
// );

const Home = () => (
  <h1>Home stuff</h1>
);

const Dining = () => (
  <h1>Dining stuff</h1>
);

export default () => (
    <div>
      <Nav />
      <div id="wrapper">
        <Sidebar />
        <div id="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dining" component={Dining} />
            <Route path="*" component={NotFound}/>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
);
