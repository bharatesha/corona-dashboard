import React from 'react';
import './App.css';
import './App.scss';

// the hoc
import { withNamespaces } from 'react-i18next';

import Home from './components/home';


function App({ t }) {
  return (
    <div className="App">
        <Home/>
        <h4>{t('footinfo')}  <a href="https://covid19.karnataka.gov.in/en/">covid19.karnataka.gov.in</a> </h4>
        <h5>{t('contact')}</h5>
    </div>
  );
}

export default withNamespaces()(App);
