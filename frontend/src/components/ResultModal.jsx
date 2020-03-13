import React from 'react';
import PropTypes from 'prop-types';

const ResultModal = ({
  show,
  toggleShowModal,
}) => {
  return show && (
    <div className="overlay" onClick={() => toggleShowModal(false)}>
      <div className="modal">
        <div className="modal__book-info">
          <div className="modal__book-title">This is where the book goes</div>
          <div className="modal__book-author">John Doe</div>
        </div>
        <div className="modal__book-location">Location: 123 to 125</div>
        <div className="modal__paragraphs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Incidunt voluptate veniam ex commodi rerum consequatur modi ea officiis deleniti ab voluptas illo ipsam in, 
          aliquid atque, consectetur accusamus quaerat reiciendis.
        </div>
        <div className="modal__pagination">
          <button className="modal__pagination--left">
            <span>&larr;</span>Prev Page
          </button>
          <button className="modal__pagination--close">
            Close
          </button>
          <button className="modal__pagination--right">
            Next Page<span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

ResultModal.propTypes = {
  show: PropTypes.bool,
  toggleShowModal: PropTypes.func,
};

ResultModal.defaultProps = {
  show: false,
  toggleShowModal: () => null,
}

export default ResultModal;
