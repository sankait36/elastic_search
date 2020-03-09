import React, { useState, useEffect, useCallback } from 'react';

import Result from './Result';
import Searchbox from './Searchbox';
import Pagination from './Pagination';

import { useSearch } from '../hooks/useSearch';
import { useDebounce } from '../hooks/useDebounce';

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

  const pageLeft = useCallback(() => {
    let offset = searchOffset;
    offset = offset - 10;
    if (offset < 0) {
      offset = 0;
    }

    // If there is a difference in the offset, make an API call for previous page
    if (offset !== searchOffset) {
      setSearchOffset(offset);
      search();
    }
  }, [numHits, searchOffset]);


  const pageRight = useCallback(() => {
    // Only if we have more than 10 results
    if (numHits > 10) {
      let offset = searchOffset;
      offset = offset + 10;
      // If you're at the end, go back
      if (offset + 10 > numHits) {
        offset = numHits - 10;
      }

      // If there is a difference in the offset, make an API call for next page
      if (offset !== searchOffset) {
        setSearchOffset(offset);
        search();
      }
    }
  }, [numHits, searchOffset]);

  // Watches the debounced term change
  useEffect(() => {
    setSearchOffset(0); // Reset the offset everytime the debounced term changes
    search();
  }, [debouncedValue]);

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
