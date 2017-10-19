import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';
import Card from './shared/card/Card';

const NotFound = () => (
  <h1> Content not found </h1>
);

const Home = () => (
  <h1>Home stuff</h1>
);

export default () => (
    <div>
      <Nav />
      <div id="wrapper">
        <Sidebar />
        <div id="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="*" component={NotFound}/>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
);
