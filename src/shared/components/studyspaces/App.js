import React, { Component } from 'react';
import uuid from 'uuid/v4';
import axios from 'axios';
import SpaceCard from './SpaceCard';
import SpaceModal from './SpaceModal';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalSpace: {}
    }
    axios.get('/api/spaces/all')
    .then(res => {
      const spaces = {};
      const today = new Date();
      const day = today.getDay();
      const time = today.getHours() + (today.getMinutes() / 60);
      res.data.spaces.forEach(space => {
        space.open = this.openOrNot(space, time, day);
        spaces[space._id] = space;
      })
      this.setState({
        spaces
      })
    });
  }
  openOrNot(space, time, day){
    const start = space.start[day];
    const end = space.end[day];
    return time > start && time < end;
  }
  renderSpaceModal(id){
    const space = this.state.spaces[id];
    this.setState({
      modalSpace: {
        space
      }
    });
  }
  closeModal(){
    this.setState({
      modalSpace: {}
    });
  }
  render() {
    return (
      <div>
<<<<<<< HEAD
        <h2>I am the study spaces app</h2>
        <StudySpacesVenue/>
=======
      {
        this.state.spaces && Object.keys(this.state.spaces).map(spaceId => {
          const space = this.state.spaces[spaceId];
          return <SpaceCard {...space} key={uuid()} renderSpaceModal={() => this.renderSpaceModal(spaceId)}/>
        })
      }
      <SpaceModal {...this.state.modalSpace} closeModal={this.closeModal.bind(this)}/>
>>>>>>> master
      </div>
    )
  }
}


export default App;
