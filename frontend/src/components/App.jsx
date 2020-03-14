import React from 'react';

import Result from './Result';
import Searchbox from './Searchbox';
import Pagination from './Pagination';
import ResultModal from './ResultModal';

import { usePages } from '../hooks/usePages';
import { useSearch } from '../hooks/useSearch';
import { useModal } from '../hooks/useModal';
import { useParagraphs } from '../hooks/useParagraphs';

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

  const {
    selectedItem,
    showModal,
    toggleShowModal,
    bookOffset,
    setBookOffset
  } = useModal();

  const {
    paragraphs,
    bookPageLeft,
    bookPageRight,
  } = useParagraphs(selectedItem, bookOffset, setBookOffset);

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
          onResultCardClick={toggleShowModal}
        />
      </div>
      <ResultModal
        show={showModal}
        bookData={selectedItem}
        paragraphs={paragraphs}
        bookOffset={bookOffset}
        toggleShowModal={toggleShowModal}
        bookPageLeft={bookPageLeft}
        bookPageRight={bookPageRight}
      />
    </>
  );
}

export default App;
