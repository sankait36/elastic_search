import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Result from './Result';

import { baseUrl } from '../utils/api';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('death');
  const [searchOffset, setSearchOffset] = useState(0);

  useEffect(() => {
    const search = async () => {
      axios.get(`${baseUrl}/search`, { params: { term: searchTerm, offset: searchOffset } })
        .then(res => {
          setSearchResults(res.data.hits.hits);
        })
        .catch(err => err)
    };
    search();
  }, []);

  return (
    <div className="container">
      <Result
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;
