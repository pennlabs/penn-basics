import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';
import Card from './shared/card/Card';

const Cards = () => (
  <div>
    <div className="columns is-desktop">
      <Card title="Dining" subtitle="Find something good to eat" hover={true} />
      <Card title="Study spaces" subtitle="Get on the grind" hover={true} />
    </div>
    <div className="columns is-desktop">
      <Card title="Laundry" subtitle="See which machines are open right now" hover={true} />
      <Card title="Reserve a room" subtitle="Get a group and get to work" hover={true} />
    </div>
  </div>
);

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
            <Route exact path="/cards" component={Cards} />
            <Route exact path="/" component={Home} />
            <Route exact path="*" component={NotFound}/>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>  
);