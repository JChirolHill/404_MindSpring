import React, { useState } from 'react';
import DocumentTitle from "react-document-title";

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
import Results from './Results';

export default function App() {
  const darkMode = useDarkMode(false);
  const [groupCode, setGroupCode] = useState();
  const [numPlayers, setNumPlayers] = useState(2);
  const [username, setUsername] = useState();
  const [numQuestions, setNumQuestions] = useState();
  const [responses, setResponses] = useState([]);

  function handleSetGroupCode(code) {
    setGroupCode(code);
  }

  function handleSetNumPlayers(num) {
    setNumPlayers(num);
  }

  function handleSetNumQs(num) {
    setNumQuestions(num);
  }

  function handleSetResponses(responses) {
    setResponses(responses);
  }

  function handleSetUsername(username) {
    setUsername(username);
  }

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
              <NavLink to="/examples" className="nav-link">
                <i className="far fa-snowflake"></i>&nbsp;Examples
              </NavLink>
            </nav>
            <div id="displayContent">
              <DocumentTitle title="MindSpring">
                <Switch>
                  <Route path="/" component={About} exact/>
                  <Route path="/solo" exact>
                    <SetUpMenu multiplayer={false} onSetNumQs={handleSetNumQs}/>
                  </Route>
                  <Route path="/solo/play" exact>
                    <Game solo={true} numQs={numQuestions} onSetResponses={handleSetResponses}/>
                  </Route>
                  <Route path="/solo/results" exact>
                    <Results solo={true} responses={responses}/>
                  </Route>
                  <Route path="/multiplayer" exact>
                    <GroupSetUpMenu numPlayers={numPlayers} onSetNumPlayers={handleSetNumPlayers} onSetGroupCode={handleSetGroupCode} onSetUsername={handleSetUsername}/>
                  </Route>
                  <Route path="/multiplayer/setup">
                    <SetUpMenu multiplayer={true} numPlayers={numPlayers} code={groupCode} onSetGroupCode={handleSetGroupCode} onSetNumQs={handleSetNumQs} onSetUsername={handleSetUsername}/>
                  </Route>
                  <Route path="/multiplayer/prep">
                    <Waiting code={groupCode} numPlayers={numPlayers} numQs={numQuestions} setup={true}/>
                  </Route>
                  <Route path="/multiplayer/play/:code" exact>
                    <Game solo={false} code={groupCode} numQs={numQuestions} username={username}/>
                  </Route>
                  <Route path="/multiplayer/preresults/:code" exact>
                    <Waiting numPlayers={numPlayers} setup={false} code={groupCode}/>
                  </Route>
                  <Route path="/multiplayer/results/:code" exact
                    render={(props) => <Results {...props} solo={false} code={groupCode} onSetCode={setGroupCode}/>}/>
                  <Route path="/examples"/>
                  <Route component={PageNotFound}/>
                </Switch>
              </DocumentTitle>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
