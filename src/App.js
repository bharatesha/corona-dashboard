import React from 'react';
import logo from './logo.svg';
import './App.css';

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
