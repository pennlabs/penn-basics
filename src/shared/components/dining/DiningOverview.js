import React, {Component} from 'react';

class DiningOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { "active": "status", };
  }

  handleClick(e, tab) {
    this.setState({ "active": tab });
  }

  render(){
    return(
      <div className="diningOverview">
        <div className="tabToggles">
          <div
            className={ this.state.active == "status" ? "tabToggle active" : "tabToggle" }
            onClick={ (e) => this.handleClick(e, "status") }>
            Status
          </div>
          <div
            className={ this.state.active == "announcements" ? "tabToggle active" : "tabToggle" }
            onClick={ (e) => this.handleClick(e, "announcements") }>
            Announcements
          </div>
          <div
            className={ this.state.active == "hours" ? "tabToggle active" : "tabToggle" }
            onClick={ (e) => this.handleClick(e, "hours") }>
            Hours
          </div>
        </div>
        <div className={ this.state.active == "status" ? "tab active" : "tab" }>
          <h1 className="title">
            Status
          </h1>
        </div>
        <div className={ this.state.active == "announcements" ? "tab active" : "tab" }>
          <h1 className="title">
            Announcements
          </h1>
        </div>
        <div className={ this.state.active == "hours" ? "tab active" : "tab" }>
          <h1 className="title">
            Hours
          </h1>
        </div>
      </div>
    )
  }
}

export default DiningOverview;
