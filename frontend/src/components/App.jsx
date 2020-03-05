import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { baseUrl } from '../utils/api';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('work');
  const [searchOffset, setSearchOffset] = useState(0);

  useEffect(() => {
    const search = async () => {
      axios.get(`${baseUrl}/search`, { params: { term: searchTerm, offset: searchOffset } })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => err)
    };
    search();
  }, []);

  return (
    <div className="container">
      <div className="results">
        <div className="results__item">
          <p className="results__highlight">
            This is a snippet where the highlights show up. This <em>works</em>, see?
          </p>
          <div className="results__info">
            <p className="results__author">
              John Doe
            </p>
            <p className="results__title">
              This might be in some book
            </p>
          </div>
          <p className="results__location">
            Location: 12391
          </p>
        </div>
        <div className="results__item">
          <p className="results__highlight">
            This is a snippet where the highlights show up. This <em>works</em>, see?
          </p>
          <div className="results__info">
            <p className="results__author">
              John Doe
            </p>
            <p className="results__title">
              This might be in some book
            </p>
          </div>
          <p className="results__location">
            Location: 12391
          </p>
        </div>
      </div>
      <div className="results__item">
        <p className="results__highlight">
          This is a snippet where the highlights show up. This <em>works</em>, see?
        </p>
        <div className="results__info">
          <p className="results__author">
            John Doe
          </p>
          <p className="results__title">
            This might be in some book
          </p>
        </div>
        <p className="results__location">
          Location: 12391
        </p>
      </div>
    </div>
  );
}

export default App;
