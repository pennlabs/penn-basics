import React, {Component} from 'react';

class Dropdown extends Component {
  render(){
    const content = this.props.options.map((option, index) => {
      return (<option key={index} value={option}>{option}</option>);
    });

    return(
      <div className="select">
        <select className="dropdown" id="meal">
          { content }
        </select>
      </div>
    );
  }
}

export default Dropdown;
