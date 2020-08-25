import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import "./App.scss";

// the hoc
import { withNamespaces } from "react-i18next";

import Home from "./components/home";
import WorldDetails from "./components/worldDetails";
import IndiaDetails from "./components/indiaDetails";
import PlayGame from "./components/playgame";
import Zrutha from "./components/zrutha";

const history = require("history").createBrowserHistory;

function App({ t }) {
  const pages = [
    {
      pageLink: "/",
      view: Home,
      displayName: "Home",
      animationDelayForNavbar: 0.2,
    },
    {
      pageLink: "/corona",
      view: Home,
      displayName: "Home",
      animationDelayForNavbar: 0.2,
    },
    {
      pageLink: "/kn",
      view: Home,
      displayName: "Home",
      animationDelayForNavbar: 0.2,
    },
    {
      pageLink: "/en",
      view: Home,
      displayName: "Home",
      animationDelayForNavbar: 0.2,
    },
    {
      pageLink: "/kn/corona",
      view: Home,
      displayName: "Home",
      animationDelayForNavbar: 0.2,
    },
    {
      pageLink: "/en/corona",
      view: Home,
      displayName: "Home",
      animationDelayForNavbar: 0.2,
    },
    {
      pageLink: "/worlddetails",
      view: WorldDetails,
      displayName: "WorldDetails",
      animationDelayForNavbar: 0.3,
    },
    {
      pageLink: "/indiadetails",
      view: IndiaDetails,
      displayName: "IndiaDetails",
      animationDelayForNavbar: 0.3,
    },
    {
      pageLink: "/playgame",
      view: PlayGame,
      displayName: "PlayGame",
      animationDelayForNavbar: 0.3,
    },
    {
          pageLink: "/zrutha",
          view: Zrutha,
          displayName: "Zrutha",
          animationDelayForNavbar: 0.3,
    },
    {
      pageLink: "/*",
      view: Home,
      displayName: "Home",
      animationDelayForNavbar: 0.1,
    },
  ];

  return (
    <div className="App">
      <Router history={history}>
        <Route
          render={({ location }) => (
            <div className="Almighty-Router">
              <Route exact path="/" render={() => <Redirect to="/corona" />} />
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
              </Switch>
            </div>
          )}
        />
      </Router>
    </div>
  );
}

export default withNamespaces()(App);
