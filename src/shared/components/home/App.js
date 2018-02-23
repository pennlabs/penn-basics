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
        show: true,
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

        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <div className="tile is-child box">
                <h1 className="title is-3">☀️ Good morning!</h1>
                <p className="content is-medium">Insert some inspirational quote here from various people at
                Penn. It will make people happy and give everyone some life.
                </p>
            </div>
            <Reserve/>
          </div>
          <div className="tile is-5 is-vertical is-parent">
            <Dining show={this.state.dining}/>
            <Studyspaces />
          </div>
        </div>


      </div>
    )
  }
}
export default Home;
