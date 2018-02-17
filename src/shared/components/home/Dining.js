import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Switch, Route, Link } from 'react-router-dom';
import DiningCards from './DiningCards';
import '../../styles/home.scss';

class Dining extends Component {

  static propTypes = {
    show: PropTypes.bool
  }

  state = {
    object: false,
  }

  render() {
    return (
        <div className="tile is-child box">
          <Link to={`/dining`} className="link">
            <h1 className="title is-3">Dining</h1>
          </Link>
          <div style={{height: "2rem", width: "100%"}}></div>
          {
            this.state.object == null
              ? <img src="https://i.imgur.com/fFniYax.png" width="500px" />
              : <div>
                <DiningCards name={"Kings Court English House"} type={0} />
                <DiningCards name={"Pret a Manger"} type={1} />
              </div>
          }
      </div>
    )
  }
}
export default Dining;
