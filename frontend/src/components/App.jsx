import React, { useState } from 'react';

import Result from './Result';
import Searchbox from './Searchbox';
import Pagination from './Pagination';

import { usePages } from '../hooks/usePages';
import { useSearch } from '../hooks/useSearch';
import ResultModal from './ResultModal';

const App = () => {
  const {
    numHits,
    searchOffset,
    searchResults,
    setSearchOffset,
    setSearchTerm,
  } = useSearch();

  const {
    pageLeft,
    pageRight,
  } = usePages(searchOffset, setSearchOffset, numHits);

  const [showModal, toggleShowModal] = useState(false);

  return (
    <>
      <div className="container">
        <div className="header">
          <Searchbox
            handleTextInput={setSearchTerm}
          />
        </div>
        {numHits !== 0 && 
          <div className="summary">
            <p className="summary__hits">{numHits} hit(s)</p>
            <p className="summary__offset">
              Displaying {searchOffset} - {searchOffset + 9} results
            </p>
          </div>
        }
        <Pagination
          handlePageLeft={pageLeft}
          handlePageRight={pageRight}
        />
        <Result
          searchResults={searchResults}
          toggleShowModal={toggleShowModal}
        />
      </div>
      <ResultModal
        show={showModal}
        toggleShowModal={toggleShowModal}
      />
    </>
  );
}

export default App;
