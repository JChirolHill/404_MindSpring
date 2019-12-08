import React, { useState, useEffect } from "react";
import DocumentTitle from "react-document-title";

import { Redirect } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import { fetchGroupCode, createGame, addUser } from "./APIFetcher";

export default function SetUpMenu(props) {
  const multiplayer = props.multiplayer;
  const [numQs, setNumQs] = useState(10);
  const [invalidUsername, setInvalidUsername] = useState("");
  const [username, setUsername] = useState("");
  const [redirectSolo, setRedirectSolo] = useState(false);
  const [redirectMulti, setRedirectMulti] = useState(false);

  // generate group code
  useEffect(() => {
    if (multiplayer) {
      fetchGroupCode().then(response => {
        props.onSetGroupCode(response.code);
      });
    }
  }, [multiplayer]);

  function handleSubmit(event) {
    event.preventDefault();

    // check all fields present
    if (
      multiplayer &&
      /^(5|10)$/.test(numQs) &&
      /^[0-9A-Za-z]{1,24}$/.test(username.trim())
    ) {
      // multiplayer
      props.onSetNumQs(numQs);
      props.onSetUsername(username.trim());
      createGame(props.code, props.numPlayers, numQs).then(response => {
        addUser(props.code, username).then(response => {
          setRedirectMulti(true);
        });
      });
    } else {
      setInvalidUsername(
        "Should be only alphanumeric characters, max length 24"
      );
    }

    if (!multiplayer && /^(5|10|15|20)$/.test(numQs)) {
      // single player
      props.onSetNumQs(numQs);
      setRedirectSolo(true);
    }
  }

  function handleChangeNumPrompts(event) {
    setNumQs(event.target.value);
  }

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }

  return (
    <div id="displayContent">
      <DocumentTitle title="MindSpring | Setup">
        <form onSubmit={handleSubmit}>
          {redirectSolo && <Redirect to="/solo/play" />}
          {redirectMulti && <Redirect to="/multiplayer/prep" />}

          {/* display group code */}
          {multiplayer && (
            <div className="text-center">
              <div>Your Group Code:</div>
              <div id="group_code">{props.code}</div>
            </div>
          )}

          {/* ask for username */}
          {multiplayer && (
            <div className="form-group row justify-content-center">
              <div className="col col-md-5  col-lg-4 text-right">
                <label htmlFor="usernameField">Username</label>
              </div>
              <div className="col col-md-5 col-lg-4">
                <input
                  type="text"
                  className="form-control text-center"
                  id="usernameField"
                  placeholder="A clever name"
                  autoFocus
                  value={username}
                  onChange={handleChangeUsername}
                />
              </div>
              {invalidUsername.length > 0 && (
                <ErrorMsg error={invalidUsername} />
              )}
            </div>
          )}

          {/* ask how many questions */}
          <div className="form-group row justify-content-center">
            <div className="col col-md-5  col-lg-4 text-right">
              <label htmlFor="numPrompts">Number of Prompts</label>
            </div>
            <div className="col col-md-5 col-lg-4">
              <select
                className="form-control"
                id="numPrompts"
                onChange={handleChangeNumPrompts}
                value={numQs}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                {!multiplayer && <option value="15">15</option>}
                {!multiplayer && <option value="20">20</option>}
              </select>
            </div>
          </div>

          {/* continue button */}
          <div className="text-right">
            <button type="submit" className="btn_text">
              {multiplayer ? (
                <i className="fab fa-pagelines"></i>
              ) : (
                <i className="fab fa-envira"></i>
              )}
              &nbsp;Continue
            </button>
          </div>
        </form>
      </DocumentTitle>
    </div>
  );
}
