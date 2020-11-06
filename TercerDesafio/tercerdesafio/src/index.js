import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';

import 'bootstrap'; 
import 'bootstrap/dist/js/bootstrap.js'; 
import $ from 'jquery';
import Popper from 'popper.js';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
 
