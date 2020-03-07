import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  handlePageLeft,
  handlePageRight,
}) => {
  return (
    <div className="pagination">
      <button className="pagination__left"
        onClick={handlePageLeft}
      >
        <span>&larr;</span>Previous Page
      </button>
      <button 
        className="pagination__right"
        onClick={handlePageRight}
      >
        Next Page<span>&rarr;</span>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  handlePageLeft: PropTypes.func,
  handlePageRight: PropTypes.func,
};

Pagination.defaultProps = {
  handlePageLeft: () => null,
  handlePageRight: () => null,
};
 
export default Pagination;
