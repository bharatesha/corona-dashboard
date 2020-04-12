import React from 'react';
import logo from './logo.svg';
import './App.css';
import './App.scss';

// the hoc
import { withNamespaces } from 'react-i18next';

import Home from './components/home';


function App({ t }) {
  return (
    <div className="App">
        <Home/>
    </div>
  );
}

export default withNamespaces()(App);
