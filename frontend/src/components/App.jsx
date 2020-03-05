import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { baseUrl } from '../utils/api';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('work');
  const [searchOffset, setSearchOffset] = useState(0);

  // useEffect(() => {
  //   const search = async () => {
  //     axios.get(`${baseUrl}/search`, { params: { term: searchTerm, offset: searchOffset } })
  //       .then(data => {
  //         console.log(data);
  //       })
  //       .catch(err => err)
  //   };
  //   search();
  // }, []);

  return (
    <div>Hello World</div>
  );
}

export default App;
