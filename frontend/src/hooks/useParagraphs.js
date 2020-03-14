import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import { baseUrl } from '../utils/api';

export const useParagraphs = (selectedItem, bookOffset, setBookOffset) => {
  const [paragraphs, setParagraphs] = useState([]);

  const search = useCallback(() => {
    if(selectedItem && bookOffset) {
      const start = bookOffset;
      const end = bookOffset + 10;
      axios.get(`${baseUrl}/paragraphs`, { 
        params: {
          bookTitle: selectedItem.title,
          start,
          end,
        },
      })
      .then(res => {
        setParagraphs(res.data.hits.hits);
      })
      .catch(err => console.log(err));
    }
  }, [selectedItem, bookOffset]);

  const bookPageLeft = () => {
    setBookOffset(e => e - 10);
  };

  const bookPageRight = () => {
    setBookOffset(e => e + 10);
  };

  useEffect(() => {
    search();
  }, [selectedItem, bookOffset]);

  return {
    paragraphs,
    bookPageLeft,
    bookPageRight,
  }
};