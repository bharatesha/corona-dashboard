import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import * as Icon from 'react-feather';


import './App.css';
import './App.scss';

// the hoc
import { withNamespaces } from 'react-i18next';

import Home from './components/home';
import WorldDetails from './components/worldDetails';

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
    }
 ]


  return (
    <div className="App">
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
