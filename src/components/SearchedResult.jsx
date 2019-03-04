import React, { Component } from 'react';
import axios from 'axios';

export default class SearchedResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      loading: false,
      positive: {},
      negative: {},
      medical: {},
      flavors: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.setEffects = this.setEffects.bind(this);
    this.setFlavors = this.setFlavors.bind(this);
  }

  handleClick(e) {
    let elem = e.currentTarget;
    let infoContainer = elem.childNodes[1];
    let clickedElemID = elem.getAttribute('data-key');

    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
      infoContainer.classList.remove('active');
    } else {
      elem.classList.add('active');
      infoContainer.classList.add('active');
    }

    this.setState(
      {
        clickedID: clickedElemID
      },
      this.setEffects
    );
  }

  setEffects() {
    let { clickedID } = this.state;

    const APIkey = '30iBMNi';

    let url = `http://strainapi.evanbusse.com/${APIkey}/strains/data/effects/${clickedID}`;

    this.setState({ loading: true });

    axios.get(url).then(res => {
      const results = res.data;

      // Turn object into array.

      const arr = Object.entries(results).reduce(
        (arr, [key, value]) => arr.concat([{ name: key, ...value }]),
        []
      );

      this.setState(
        {
          positive: arr[0],
          negative: arr[1],
          medical: arr[2]
        },
        this.setFlavors
      );
    });
  }

  setFlavors() {
    let { clickedID } = this.state;

    const APIkey = '30iBMNi';

    let url = `http://strainapi.evanbusse.com/${APIkey}/strains/data/flavors/${clickedID}`;

    this.setState({ loading: true });

    axios.get(url).then(res => {
      const results = res.data;
      this.setState({
        flavors: results
      });
    });
  }

  render() {
    const { result, index } = this.props;
    const { medical, positive, negative } = this.state;

    return (
      <div
        key={index}
        className="result"
        onClick={this.handleClick}
        data-key={result.id}
      >
        <div className="result-name-type-container">
          <h1 className="result-name">{result.name}</h1>
          <div className="result-race">{result.race}</div>
        </div>
        <div className="result-effect-container">
          <p>{result.desc}</p>
        </div>
      </div>
    );
  }
}
