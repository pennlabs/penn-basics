import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';
import Home from './home/Home';

const NotFound = () => (
  <h1> Content not found </h1>
);

const Dining = () => (
  <h1>Dining stuff</h1>
);

export default () => (
    <div>
      <Nav />
      <div id="wrapper">
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
