import React, { useState, useEffect } from "react";
import DocumentTitle from "react-document-title";
import { Redirect } from "react-router-dom";
import PlayerLeaves from "./PlayerLeaves";
import ErrorMsg from "./ErrorMsg";
import { addUser } from "./APIFetcher";

export default function GroupSetUpMenu(props) {
  const [groupCode, setGroupCode] = useState("");
  const [username, setUsername] = useState("");
  const [invalidGroupCode, setInvalidGroupCode] = useState("");
  const [invalidUsername, setInvalidUsername] = useState("");
  const [redirectSolo, setRedirectSolo] = useState(false);
  const [redirectCreate, setRedirectCreate] = useState(false);
  const [redirectJoin, setRedirectJoin] = useState(false);
  const [joinFormSubmitted, setJoinFormSubmitted] = useState(false);

  useEffect(() => {
    if (joinFormSubmitted) {
      addUser(groupCode, username).then(response => {
        console.log(response);
        if (response.message) {
          if (response.errorType === "user") {
            setInvalidUsername(response.message);
          } else if (response.errorType === "code") {
            setInvalidGroupCode(response.message);
          } else {
            setInvalidGroupCode(response.message);
          }
          setJoinFormSubmitted(false);
        } else {
          // proceed to waiting
          props.onSetNumPlayers(response.numPlayers);
          props.onSetGroupCode(groupCode);
          setRedirectJoin(true);
        }
      });
    }
  }, [joinFormSubmitted]);

  function handleChangeGroupCode(event) {
    setGroupCode(event.target.value);
  }

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleSubmitCreate(event) {
    event.preventDefault();
    if (props.numPlayers > 0 && props.numPlayers < 5) {
      // 1-4 players
      if (props.numPlayers === 1) {
        // redirect to solo
        setRedirectSolo(true);
      } else {
        // redirect to setup
        setRedirectCreate(true);
      }
    }
  }

  function handleSubmitJoin(event) {
    event.preventDefault();
    let errors = false;

    if (!/^\d{4}$/.test(groupCode.trim())) {
      setInvalidGroupCode("Should be a 4 digit number");
      errors = true;
    } else {
      setInvalidGroupCode("");
    }

    if (!/^[0-9A-Za-z]{1,24}$/.test(username.trim())) {
      setInvalidUsername("Only alphanumeric characters, max length 24");
      errors = true;
    } else {
      setInvalidUsername("");
    }

    // no errors from inputs, check database
    if (!errors) {
      props.onSetUsername(username.trim());
      setJoinFormSubmitted(true); // triggers the useeffect hook
    }
  }

  return (
    <DocumentTitle title="MindSpring | Group Setup">
      <div className="row">
        {redirectSolo && <Redirect to="/solo" />}
        {redirectCreate && <Redirect to="/multiplayer/setup" />}
        {redirectJoin && <Redirect to="/multiplayer/prep" />}

        {/* create group selection */}
        <div className="col-12 col-md">
          <form onSubmit={handleSubmitCreate} className="border_bisection">
            <h3 className="text-center">Create Group</h3>

            <div className="form-group justify-content-center">
              <div className="text-center">
                <label htmlFor="numPlayersField">
                  Number of Players: {props.numPlayers}
                </label>
              </div>
              <div className="text-center">
                <PlayerLeaves
                  value={props.numPlayers}
                  onClick={props.onSetNumPlayers}
                  size="2x"
                />
              </div>
            </div>

            <div className="text-right">
              <button type="submit" className="btn_text">
                <i className="fab fa-pagelines"></i>&nbsp;Generate Group Code
              </button>
            </div>
          </form>
        </div>

        {/* join group selection */}
        <div className="col-12 col-md">
          <form onSubmit={handleSubmitJoin}>
            <h3 className="text-center">Join Group</h3>

            <div className="form-group row justify-content-center">
              <div className="col-5 col-md text-right">
                <label htmlFor="groupCodeField">Group Code</label>
              </div>
              <div className="col-7 col-md">
                <input
                  type="text"
                  className="form-control text-center"
                  id="groupCodeField"
                  placeholder="1234"
                  value={groupCode}
                  onChange={handleChangeGroupCode}
                />
              </div>
              {invalidGroupCode.length > 0 && (
                <ErrorMsg error={invalidGroupCode} />
              )}
            </div>

            <div className="form-group row justify-content-center">
              <div className="col-5 col-md text-right">
                <label htmlFor="usernameField">Username</label>
              </div>
              <div className="col-7 col-md ">
                <input
                  type="text"
                  className="form-control text-center"
                  id="usernameField"
                  placeholder="A clever name"
                  max="12"
                  value={username}
                  onChange={handleChangeUsername}
                />
              </div>
              {invalidUsername.length > 0 && (
                <ErrorMsg error={invalidUsername} />
              )}
            </div>

            <div className="text-right">
              <button type="submit" className="btn_text">
                <i className="fab fa-pagelines"></i>&nbsp;Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </DocumentTitle>
  );
}
