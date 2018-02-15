import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter, Route } from 'react-router-dom'
// import {Router, Route} from 'react-router';
import Detail from './Detail'

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>),
  document.getElementById('root')
);