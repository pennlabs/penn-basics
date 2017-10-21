import React, {Component} from 'react';

class Card extends Component {
  render(){
    const content = (
      <div className="card">
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
    );

    if (this.props.url) {
      return (
        <div className="column is-half-desktop">
          <a href={this.props.url}>
            {content}
          </a>
        </div>
      );
    } else {
      return (
        <div className="column is-half-desktop">
          {content}
        </div>
      );
    }
  }
}

export default Card;
