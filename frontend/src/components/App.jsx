import React, { useState, useEffect, useCallback } from 'react';

import Result from './Result';
import Searchbox from './Searchbox';
import Pagination from './Pagination';

import { useDebounce } from '../hooks/useDebounce';
import { usePages } from '../hooks/usePages';
import { useSearch } from '../hooks/useSearch';

const App = () => {

  const {
    numHits,
    search,
    searchOffset,
    searchResults,
    searchTerm,
    setSearchOffset,
    setSearchTerm,
  } = useSearch();

  // Debouncing the search time to pad out the API requests to Elasticsearch
  const debouncedValue = useDebounce(searchTerm, 100);

  const {
    pageLeft,
    pageRight,
  } = usePages(searchOffset, setSearchOffset, numHits);

  // Watches the debounced term change
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
      {numHits !== 0 && 
        <div className="summary">
          <p className="summary__hits">{numHits} hit(s)</p>
          <p className="summary__offset">Displaying {searchOffset} - {searchOffset + 9} results</p>
        </div>
      }
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
