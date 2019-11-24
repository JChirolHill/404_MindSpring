import React from 'react';
import useDarkMode from 'use-dark-mode';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import SettingsTab from './SettingsTab';

export default function App() {
  const darkMode = useDarkMode(false);

  return (
    <div className="container">
      <Router>
        <SettingsTab darkmode={darkMode.value} onChangeMode={darkMode.toggle}/>

        <div id="title">
          <NavLink to="/" className="nav-link" exact>MindSpring</NavLink>
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
                Best Of
              </NavLink>
            </nav>
            <div id="displayContent">
            <Switch>
              <Route path="/" exact/>
              <Route path="/solo"></Route>
              <Route path="/multiplayer"></Route>
              <Route path="/bestof"></Route>
            </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
