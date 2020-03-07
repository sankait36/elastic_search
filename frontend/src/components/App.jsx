import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Result from './Result';
import Searchbox from './Searchbox';
import Pagination from './Pagination';

import { useDebounce } from '../hooks/useDebounce';
import { baseUrl } from '../utils/api';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOffset, setSearchOffset] = useState(0);

  const debouncedValue = useDebounce(searchTerm, 100);

  const [numHits, setNumHits] = useState(0);

  const search = useCallback(async () => {
    axios.get(`${baseUrl}/search`, { params: { term: searchTerm, offset: searchOffset } })
      .then(res => {
        setNumHits(res.data.hits.total);
        setSearchResults(res.data.hits.hits);
      })
      .catch(err => err);
  }, [searchTerm, searchOffset]);


  const pageLeft = useCallback(() => {
    let offset = searchOffset;
    offset = offset - 10;
    if (offset < 0) {
      offset = 0;
    }
    setSearchOffset(offset);
  }, [numHits, searchOffset]);


  const pageRight = useCallback(() => {
    if (numHits > 10) {
      let offset = searchOffset;
      offset = offset + 10;
      if (offset + 10 > numHits) {
        offset = numHits - 10;
      }
      setSearchOffset(offset);
    }
  }, [numHits, searchOffset]);

  useEffect(() => {
    search();
  }, [debouncedValue, searchOffset]);

  return (
    <div className="container">
      <div className="header">
        <Searchbox
          handleTextInput={setSearchTerm}
        />
      </div>
      <Pagination
        handlePageLeft={pageLeft}
        handlePageRight={pageRight}
      />
      <Result
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;
