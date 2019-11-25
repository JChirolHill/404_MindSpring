import React from 'react';
import useDarkMode from 'use-dark-mode';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import SettingsTab from './SettingsTab';
import About from './About';
import PageNotFound from './PageNotFound';
import SetUpMenu from './SetUpMenu';
import GroupSetUpMenu from './GroupSetUpMenu';
import Waiting from './Waiting';
import Game from './Game';

export default function App() {
  const darkMode = useDarkMode(false);

  return (
    <div className="container">
      <Router>
        <SettingsTab darkmode={darkMode.value} onChangeMode={darkMode.toggle}/>

        <div id="title">
          <NavLink to="/" className="nav-link" exact>Mind<span>Spring</span></NavLink>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-8" id="displayContainer">
            <nav className="nav nav-tabs justify-content-center">
              <NavLink to="/solo" className="nav-link">
                <i className="fab fa-envira"></i>&nbsp;Solo
              </NavLink>
              <NavLink to="/multiplayer" className="nav-link">
                <i className="fab fa-pagelines"></i>&nbsp;Multiplayer
              </NavLink>
              <NavLink to="/bestof" className="nav-link">
                <i className="far fa-snowflake"></i>&nbsp;Best Of
              </NavLink>
            </nav>
            <div id="displayContent">
            <Switch>
              <Route path="/" component={About} exact/>
              <Route path="/solo" exact>
                <SetUpMenu multiplayer={false}/>
              </Route>
              <Route path="/solo/:numQs" component={Game} exact/>
              <Route path="/multiplayer" component={GroupSetUpMenu} exact/>
              <Route path="/multiplayer/setup">
                <SetUpMenu multiplayer={true}/>
              </Route>
              <Route path="/multiplayer/prep">
                <Waiting/>
              </Route>
              <Route path="/bestof"></Route>
              <Route component={PageNotFound}></Route>
            </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
