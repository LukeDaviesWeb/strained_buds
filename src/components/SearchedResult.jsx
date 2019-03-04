import React, { Component } from 'react';

export default class SearchedResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }
  render() {
    const { result, index } = this.props;

    console.log(result);

    return (
      <div key={index} className="result" onClick={this.handleClick}>
        <p>{result.id}</p>
        <p>{result.name}</p>
        <p>{result.race}</p>
        <p>{result.desc}</p>
      </div>
    );
  }
}
