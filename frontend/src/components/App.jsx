import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Result from './Result';
import Searchbox from './Searchbox';

import { baseUrl } from '../utils/api';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('taxes');
  const [searchOffset, setSearchOffset] = useState(0);

  const [numHits, setNumHits] = useState(0);

  useEffect(() => {
    const search = async () => {
      axios.get(`${baseUrl}/search`, { params: { term: searchTerm, offset: searchOffset } })
        .then(res => {
          setNumHits(res.data.hits.total);
          setSearchResults(res.data.hits.hits);
        })
        .catch(err => err)
    };
    search();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <Searchbox />
      </div>
      <Result
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;
