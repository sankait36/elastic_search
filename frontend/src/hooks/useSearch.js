import { useState, useCallback } from 'react';
import axios from 'axios';

import { baseUrl } from '../utils/api';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOffset, setSearchOffset] = useState(0);

  const [numHits, setNumHits] = useState(0);

  const search = useCallback(async () => {
    axios.get(`${baseUrl}/search`, { params: { term: searchTerm, offset: searchOffset } })
      .then(res => {
        // Sets the hits and the search results
        setNumHits(res.data.hits.total);
        setSearchResults(res.data.hits.hits);
      })
      .catch(err => err);
  }, [searchTerm, searchOffset]);

  return {
    searchResults,
    searchTerm,
    setSearchTerm,
    searchOffset,
    setSearchOffset,
    numHits,
    search,
  }
}