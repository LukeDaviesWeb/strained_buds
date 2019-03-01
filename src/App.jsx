import React, { Component } from 'react';
import axios from 'axios';
import Result from './components/Result';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      searchType: 'name',
      loading: false,
      sent: false,
      results: [],
      error: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    let { search, searchType } = this.state;
    const APIkey = '30iBMNi';

    let url = `http://strainapi.evanbusse.com/${APIkey}/strains/search/`;

    this.setState({ loading: true });

    search = search
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

    if (search && searchType) {
      url += `${searchType}/${search}`;
    } else if (search) {
      url += search;
    } else {
      url += 'all';
    }
    console.log(url);

    axios.get(url).then(res => {
      const results = res.data;

      // Turn object into array.

      const arr = Object.entries(results).reduce(
        (arr, [key, value]) => arr.concat([{ name: key, ...value }]),
        []
      );

      this.setState({ results: arr, loading: false });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.getResults();
  }

  onChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { search, searchType, results, loading } = this.state;

    return (
      <div className="App">
        <form action="#" onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="search"
            name="search"
            value={search}
            onChange={this.onChange}
          />

          <select value={searchType} onChange={this.onChange} name="searchType">
            <option value="name">Name</option>
            <option value="flavour">Flavour</option>
            <option value="effect">Effect</option>
            <option value="race">Race</option>
          </select>

          <input type="submit" />
        </form>
        <div className="result-grid">
          {loading ? (
            <p>loading...</p>
          ) : (
            results.map((result, index) => (
              <Result result={result} index={index} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
