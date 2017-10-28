import React, {Component} from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: false,
    }
  }

  // options() {
  //
  //   return (
  //     <div>
  //       { content }
  //     </div>
  //   );
  // }

  handleClick() {
    this.setState({toggled: !this.state.toggled});
  }

  render(){
    const content = this.props.options.map((option, index) => {
      return (<li key={index}>{option}</li>);
    });

    return(
      <div className="dropdown" id="meal" onClick={this.handleClick.bind(this)}>
        <p>
          {this.props.value} <i className="fa fa-chevron-down"></i>
        </p>
        <ul className={this.state.toggled ? "active" : ""}>
          { content }
        </ul>
      </div>
    );
  }
}

export default Dropdown;
