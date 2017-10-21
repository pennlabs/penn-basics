import React, {Component} from 'react';

class Card extends Component {
  render(){
    const content = (
      <div className="column is-half-desktop">
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
      </div>
    );

    if (this.props.url) {
      return (
        <a href={this.props.url}>
          {content}
        </a>
      );
    } else {
      return content;
    }
  }
}

export default Card;
