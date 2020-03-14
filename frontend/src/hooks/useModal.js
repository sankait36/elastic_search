import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookOffset, setBookOffset] = useState(0);

  const toggleShowModal = (modalState, itemClicked, offset) => {
    setBookOffset(offset);
    setSelectedItem(itemClicked)
    setShowModal(modalState);
  };

  return {
    showModal,
    selectedItem,
    toggleShowModal,
    bookOffset,
    setBookOffset,
  };
};
