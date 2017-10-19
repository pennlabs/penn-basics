import React, {Component} from 'react';

class Card extends Component {
  render(){
    return(
      <div className="column is-half-desktop">
        <div className={ this.props.hover ? 'card hover' : 'card' }>
          <div className="card-content">
          <p className="title">
            { this.props.title }
          </p>
          { this.props.subtitle ?
            <p className="subtitle medium-gray-text">
              { this.props.subtitle}
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
