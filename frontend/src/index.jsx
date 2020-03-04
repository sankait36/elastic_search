import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import '../sass/main.scss';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
