import React, {Component} from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
    }
  }

  handleClick() {
    this.setState({toggled: !this.state.toggled});
  }

  render(){
    const content = this.props.options.map((option, index) => {
      return (<option key={index} value={option}>{option}</option>);
    });

    return(
      <div className="select">
        <select className="dropdown" id="meal" onClick={this.handleClick.bind(this)}>
          { content }
        </select>
      </div>
    );
  }
}

export default Dropdown;
