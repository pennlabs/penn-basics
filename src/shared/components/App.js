import React, { Component } from 'react';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';
import Card from './shared/card/Card';

export default () => (
    <div>
      <Nav />
      <div id="wrapper">
        <Sidebar />
        <div id="app">
          <div className="columns is-desktop">
            <Card title="Dining" subtitle="Find something good to eat" hover={true} />
            <Card title="Study spaces" subtitle="Get on the grind" hover={true} />
          </div>
          <div className="columns is-desktop">
            <Card title="Laundry" subtitle="See which machines are open right now" hover={true} />
            <Card title="Reserve a room" subtitle="Get a group and get to work" hover={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>  
)