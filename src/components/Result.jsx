import React, { Component } from 'react';
import './result.css';

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.getFlavors = this.getFlavors.bind(this);
    this.getPositive = this.getPositive.bind(this);
    this.getNegative = this.getNegative.bind(this);
    this.getMedical = this.getMedical.bind(this);

    this.state = {
      active: false
    };
  }

  handleClick(e) {
    let elem = e.currentTarget;
    let infoContainer = elem.childNodes[1];
    let tasteContainer = elem.childNodes[2];

    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
      infoContainer.classList.remove('active');
      tasteContainer.classList.remove('active');
    } else {
      elem.classList.add('active');
      tasteContainer.classList.add('active');
      infoContainer.classList.add('active');
    }
  }

  getFlavors() {
    const flavors = this.props.result.flavors || [];

    return (
      <ul>
        {flavors.map(flavor => (
          <li key={flavor}>{flavor}</li>
        ))}
      </ul>
    );
  }

  getPositive() {
    const positives = this.props.result.effects.positive;

    if (positives) {
      return (
        <ul>
          {positives.map(positive => (
            <li key={positive}>{positive}</li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

  getNegative() {
    const negatives = this.props.result.effects.negative;

    if (negatives) {
      return (
        <ul>
          {negatives.map(negative => (
            <li key={negative}>{negative}</li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

  getMedical() {
    const medicals = this.props.result.effects.medical;

    if (medicals) {
      return (
        <ul>
          {medicals.map(medical => (
            <li key={medical}>{medical}</li>
          ))}
        </ul>
      );
    } else {
      return null;
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
            {this.getPositive()}
          </div>
          <div>
            <h4>The bad:</h4>

            {this.getNegative()}
          </div>
          <div>
            <h4>The Medical: </h4>
            <p>{this.getMedical()}</p>
          </div>
        </div>

        <div className="result-effect-container">
          <div>
            <h4>Tastes like: </h4>
            <div className="flavors">{this.getFlavors()}</div>
          </div>
        </div>
      </div>
    );
  }
}
