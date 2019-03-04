import React, { Component } from 'react';
import axios from 'axios';
import Result from './components/Result';
import SearchedResult from './components/SearchedResult';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      searchType: 'name',
      searchList: [],
      wasSearched: false,
      loading: false,
      sent: false,
      results: [],
      error: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.addToSearchedList = this.addToSearchedList.bind(this);
    this.searchAll = this.searchAll.bind(this);
  }

  searchAll() {
    this.getResults();
    console.log('get all results');
  }

  //api call to get all results
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

      // console.log(arr);

      this.setState({
        results: arr,
        loading: false
      });
    });
  }

  //api call to get search results
  getSearchResults() {
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
      this.addToSearchedList(arr);
      // console.log(arr);

      this.setState({
        results: arr,
        loading: false,
        wasSearched: true
      });
    });
  }

  addToSearchedList(resultsArr) {
    console.log(`results array from addToSearchList(): `, resultsArr[0].name);
    let searchedItem = resultsArr[0].name;
    let searchList = {
      name: [...this.state.searchList, searchedItem],
      todoList: false
    };

    this.setState({
      searchList
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.getSearchResults();
  }

  onChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { search, searchType, results, loading, wasSearched } = this.state;

    return (
      <div className="App">
        <div id="top" />
        <div className="title-container">
          <h1>
            Strainer<span>.</span>
          </h1>
          {search ? (
            <h4 className="sub-heading sub-heading-h4">
              {wasSearched ? `${search}` : `That's it...`}
            </h4>
          ) : (
            <p className="sub-heading">
              Search a strain name, effect, flavor or race
            </p>
          )}
        </div>
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

        <div className="searchAllBtnContainer">
          <button
            type="submit"
            className="searchAllBtn"
            onClick={this.searchAll}
          >
            Search All
          </button>
        </div>

        <div className="result-grid">
          {loading ? (
            <div className="loader">
              <div className="loader-progress" />
            </div>
          ) : (
            results.map((result, index) =>
              wasSearched ? (
                <SearchedResult result={result} index={index} />
              ) : (
                <Result result={result} index={index} />
              )
            )
          )}
        </div>
        <a href="#top" className="go-to-top">
          <i className="fas fa-arrow-up" />
        </a>
      </div>
    );
  }
}

export default App;
