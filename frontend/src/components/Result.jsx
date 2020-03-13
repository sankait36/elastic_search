import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { defaultSearchResults } from '../utils/defaultProps';

const Result = ({
  searchResults,
  toggleShowModal,
}) => {
  const resultCards = searchResults.map(item => {
    return (
      <div 
        className="results__item"
        key={item._id}
        onClick={() => toggleShowModal(true)}>
        <p className="results__highlight">{ReactHtmlParser(item.highlight.text[0])}</p>
        <div className="results__info">
          <p className="results__author">{item._source.author}</p>
          <p className="results__title">{item._source.title}</p>
        </div>
        <p className="results__location">Location: {item._source.location}</p>
      </div>
    );
  });
  return resultCards.length === 0
    ? (
      <div className="results">
        <div className="results__empty">No results found</div>
      </div>
    )
    : <div className="results">{resultCards}</div>
};

Result.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      _index: PropTypes.string,
      _type: PropTypes.string,
      _id: PropTypes.string,
      _score: PropTypes.number,
      _source: PropTypes.shape({
        author: PropTypes.string,
        title: PropTypes.string,
        location: PropTypes.number,
        text: PropTypes.string,
      }),
      highlight: PropTypes.shape({
        text: PropTypes.arrayOf(PropTypes.string),
      })
    }
  )),
  toggleShowModal: PropTypes.func,
};

Result.defaultProps = {
  searchResults: defaultSearchResults,
  toggleShowModal: () => null,
};

export default Result;
