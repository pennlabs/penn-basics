import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Dining from './Dining';
import Laundry from './Laundry';
import Studyspaces from './Studyspaces';
import Reserve from './Reserve';
import Notification from './Notification';
import axios from 'axios';
import '../../styles/home.scss';

class Home extends Component {
  constructor(props) {
    super (props);
      this.state = {
        show: false,
        notification: [],
        dining: false,
      }
      this.close = this.close.bind(this);
  }
  componentDidMount() {
    axios.post('/api/events', {
                start: Date.now()
              })
      .then((resp) => {
        if (resp.data.events.length === 0) {
          this.setState({show: false})
        } else {
          this.setState({show: true, notification: resp.data.events})
        }
        console.log("DATE RESP", resp.data.events);
      })
      .catch(err => {
        console.log(err);
      })
  }
  close() {
    this.setState({show: false});
  }

  render() {
    return (
      <div>
        {
          this.state.show && (
            <Notification show={this.close} text={this.state.notification} />
          )
        }
        {/* <div style={{ padding: "30px" }} className="tile is-ancestor">
          <div className="tile is-ancestor is-vertical">
            <div className="tile is-parent">
              <Reserve />

            </div>
          </div>
          <div className="tile is-ancestor is-vertical">
            <div className="tile is-parent">
              <Dining show={this.state.dining}/>
            </div>
            <div className="tile is-parent">
              <Studyspaces />
            </div>
          </div>
        </div> */}

        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <Reserve/>
          </div>
          <div className="tile is-5 is-vertical is-parent">
            <Dining show={this.state.dining}/>
            <div className="tile is-child box">
              <p className="title">Two</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
            </div>
          </div>
        </div>


      </div>
    )
  }
}
export default Home;
