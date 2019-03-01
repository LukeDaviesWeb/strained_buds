import React, { Component } from 'react';
import './result.css';
export default class Result extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      active: false
    };
  }

  handleClick(e) {
    let elem = e.currentTarget;
    let infoContainer = elem.childNodes[1];

    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
    } else {
      elem.classList.add('active');
    }

    if (infoContainer.classList.contains('active')) {
      infoContainer.classList.remove('active');
    } else {
      infoContainer.classList.add('active');
    }
  }

  render() {
    const { result, index } = this.props;

    return (
      <div key={index} className="result" onClick={this.handleClick}>
        <div className="result-name-type-container">
          <h1 className="result-name">{result.name}</h1>
          <div className="result-race">{result.race}</div>
        </div>

        <div className="result-effect-container">
          <div>
            <h4>The good: </h4>
            <p>{result.effects.positive}</p>
          </div>
          <div>
            <h4>The bad:</h4>

            <p>{result.effects.negative}</p>
          </div>
        </div>
      </div>
    );
  }
}
