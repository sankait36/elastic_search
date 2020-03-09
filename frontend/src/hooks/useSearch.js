import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import { useDebounce } from '../hooks/useDebounce';

import { baseUrl } from '../utils/api';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOffset, setSearchOffset] = useState(0);

  const [numHits, setNumHits] = useState(0);

  // Debouncing the search time to pad out the API requests to Elasticsearch
  const debouncedValue = useDebounce(searchTerm, 100);

  const search = useCallback(async () => {
    axios.get(`${baseUrl}/search`, { params: { term: searchTerm, offset: searchOffset } })
      .then(res => {
        // Sets the hits and the search results
        setNumHits(res.data.hits.total);
        setSearchResults(res.data.hits.hits);
      })
      .catch(err => err);
  }, [searchTerm, searchOffset]);

    // Watches the debounced term change
    useEffect(() => {
      search();
    }, [debouncedValue, searchOffset]);

  return {
    searchResults,
    setSearchTerm,
    searchOffset,
    setSearchOffset,
    numHits,
  };
};
