import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import * as Icon from 'react-feather';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import StepLabel    from '@material-ui/core/StepLabel';
import FormControl from '@material-ui/core/FormControl';


import './App.css';
import './App.scss';

// the hoc
import { withNamespaces } from 'react-i18next';
import i18n from './i18n';

import Home from './components/home';
import WorldDetails from './components/worldDetails';
import IndiaDetails from './components/indiaDetails';

const history = require('history').createBrowserHistory;

function App({ t }) {

const pages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Home',
      animationDelayForNavbar: 0.2,
    },
    {
      pageLink: '/worlddetails',
      view: WorldDetails,
      displayName: 'WorldDetails',
      animationDelayForNavbar: 0.3,
    },
     {
      pageLink: '/indiadetails',
      view: IndiaDetails,
      displayName: 'IndiaDetails',
      animationDelayForNavbar: 0.3,
    },
 ]

  const [lang, setLang] = React.useState('en');

  const handleChange = (event) => {
    let val = event.target.value;
    i18n.changeLanguage(val);
    setLang(val);
  };

  return (
    <div className="App">

    <FormControl style={{flexFlow:'row'}}>
     <StepLabel style={{marginRigh:'10px'}} >Language</StepLabel>
    <Select
              value={lang}
              onChange={handleChange}
              disableUnderline
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='kn'>ಕನ್ನಡ</MenuItem>
            </Select>
</FormControl>

     <Router history={history}>
            <Route
              render={({location}) => (
                <div className="Almighty-Router">

                  <Route exact path="/" render={() => <Redirect to="/" />} />
                  <Switch location={location}>
                    {pages.map((page, i) => {
                      return (
                        <Route
                          exact
                          path={page.pageLink}
                          component={page.view}
                          key={i}
                        />
                      );
                    })}
                    <Redirect to="/" />
                  </Switch>
                </div>
              )}
            />
          </Router>

    </div>
  );
}

export default withNamespaces()(App);
