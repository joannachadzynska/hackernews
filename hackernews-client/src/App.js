import React, { Component } from 'react';
import axios from 'axios';
import { Table, Search } from './components';
import { DEFAULT_QUERY, searchUrl } from './utils/api';
import './App.css';
import Button from './components/Button';

// const App = () => {
//   const [searchTerm, setSearchTerm] = React.useState('');

//   const handleChange = event => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div>
//       <h1>My Hacker Stories</h1>

//       <label htmlFor="search">Search: </label>
//       <input id="search" type="text" onChange={handleChange} />

//       <p>
//         Searching for <strong>{searchTerm}</strong>.
//       </p>

//       <hr />

//       <List list={stories} />
//     </div>
//   );
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
    };
  }

  needsToSearchTopStories = searchTerm => {
    return !this.state.results[searchTerm];
  };

  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  };

  onChangeSearch = e => {
    this.setState({ searchTerm: e.target.value });
  };

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(searchUrl(searchTerm, page))
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error }));
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit = e => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
  };

  render() {
    const { searchTerm, results, searchKey, error } = this.state;

    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    const list =
      (results && results[searchKey] && results[searchKey].hits) ||
      [];

    return (
      <div className="page">
        <h1>My Hacker Stories</h1>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onChangeSearch}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>

        {error ? (
          <p>Something went wrong.</p>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} />
        )}

        <div className="interactions">
          <Button
            onClick={() =>
              this.fetchSearchTopStories(searchKey, page + 1)
            }
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
