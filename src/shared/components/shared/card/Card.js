import React, {Component} from 'react';

class Card extends Component {
  render(){
    return(
      <div className="column is-half-desktop">
        <div className={ this.props.hover ? 'card hover' : 'card' }>
          <div className="card-content">
          <p class="title">
            { this.props.title }
          </p>
          { this.props.subtitle ?
            <p class="subtitle">
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
