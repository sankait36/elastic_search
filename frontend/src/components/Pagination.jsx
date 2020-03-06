import React from 'react';

const Pagination = ({

}) => {
  return (
    <div className="pagination">
      <button className="pagination__left">
        <span>&larr;</span>Previous Page
      </button>
      <button className="pagination__right">
        Next Page<span>&rarr;</span>
      </button>
    </div>
  );
}
 
export default Pagination;
