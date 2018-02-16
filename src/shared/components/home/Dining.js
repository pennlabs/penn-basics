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
      <article className="tile is-child notification whiteCard">
        <Link to={`/dining`} className="link">
          <h1 className="title is-3">Dining</h1>
        </Link>
        {
          this.props.show === false
            ? <h3 className="subtitle is-5">Sorry! Nothing is open right now.</h3>
            : <h3 className="subtitle is-5">1920 Commons looks like a great
          place to eat right now.</h3>
        }
        {
          this.state.object == null
            ? <img src="https://i.imgur.com/fFniYax.png" width="500px" />
            : <div>
              <DiningCards name={"Kings Court English House"} type={0} />
              <DiningCards name={"Pret a Manger"} type={1} />
            </div>
        }
      </article>
    )
  }
}
export default Dining;
