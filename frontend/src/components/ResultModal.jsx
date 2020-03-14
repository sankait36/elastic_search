import React from 'react';
import PropTypes from 'prop-types';

import { defaultModalData, defaultModalParagraphs } from '../utils/defaultProps';

const ResultModal = ({
  show,
  bookData,
  paragraphs,
  bookOffset,
  toggleShowModal,
  bookPageLeft,
  bookPageRight,
}) => {
  const paragraphText = paragraphs.map(item => {
    return (bookData && item._source.location === bookData.location) ? (
      <div className="modal__paragraphs--bold" key={item._id}>
        {item._source.text}
      </div>
    ) : (
      <div className="modal__paragraphs--regular" key={item._id}>
        {item._source.text}
      </div>
    );
  });
  return show && (
    <div className="overlay">
      <div className="modal">
        <div className="modal__book-info">
          <div className="modal__book-title">{bookData.title}</div>
          <div className="modal__book-author">{bookData.author}</div>
        </div>
        <div className="modal__book-location">Location: {bookOffset - 5} to {bookOffset + 5}</div>
        <div className="modal__paragraphs">
          {paragraphText}
        </div>
        <div className="modal__pagination">
          <button
            className="modal__pagination--left"
            onClick={bookPageLeft}
          >
            <span className="arrow">&larr;</span>
            <span className="modal__pagination--text">Prev Page</span>
          </button>
          <button
            className="modal__pagination--close"
            onClick={() => toggleShowModal(false, null, null)}
          >
            Close
          </button>
          <button
            className="modal__pagination--right"
            onClick={bookPageRight}
          >
            <span className="modal__pagination--text">Next Page</span>
            <span className="arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

ResultModal.propTypes = {
  show: PropTypes.bool,
  bookData: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.location,
    text: PropTypes.text,
  }),
  paragraphs: PropTypes.arrayOf(
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
      sort: PropTypes.arrayOf(PropTypes.number),
    }
  )),
  bookOffset: PropTypes.number,
  toggleShowModal: PropTypes.func,
  bookPageLeft: PropTypes.func,
  bookPageRight: PropTypes.func,
};

ResultModal.defaultProps = {
  show: false,
  bookData: defaultModalData,
  paragraphs: defaultModalParagraphs,
  bookOffset: 10,
  toggleShowModal: () => null,
  bookPageLeft: () => null,
  bookPageRight: () => null,
}

export default ResultModal;
