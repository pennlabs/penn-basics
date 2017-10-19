import React, {Component} from 'react';

class Card extends Component {
  render(){
    return(
      <div className="column is-half-desktop">
        <div className="card">
          <div className="card-content">
          <p class="title">
            { this.props.title }
          </p>
          { this.props.subtitle ?
            <p class="subtitle">
              Find something good to eat.
            </p>
            :
            ''
          }
          </div>
        </div>
      </div>
    )
  }
}

export default Card;
