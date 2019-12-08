import React, { useState, useEffect } from "react";
import DocumentTitle from "react-document-title";
import { Redirect } from "react-router-dom";
import { Quote, Image } from "./PromptTemplates";
import Loading from "./Loading";
import { getPrompts, submitSimilarities } from "./APIFetcher";

export default function Game(props) {
  const [loading, setLoading] = useState(true);

  const [prompts, setPrompts] = useState([]);

  const [similarity, setSimilarity] = useState("");
  const [similarities] = useState([]);

  const [currP1, setCurrP1] = useState({});
  const [currP2, setCurrP2] = useState({});

  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectResults, setRedirectResults] = useState(false);
  const [redirectWaiting, setRedirectWaiting] = useState(false);

  const [progressStyle, setProgressStyle] = useState({
    width: "0%"
  });

  const solo = props.solo;

  // load all the prompts
  useEffect(() => {
    getPrompts(solo, props.numQs, props.code).then(response => {
      if (!response.message) {
        let firstPrompt = response.pop();
        setCurrP1(firstPrompt[0]);
        setCurrP2(firstPrompt[1]);
        setPrompts(response);
        setLoading(false);
      } else {
        setRedirectHome(true);
      }
    });
  }, [solo, props.numQs, props.code]);

  function handleChangeSimilarity(event) {
    setSimilarity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (similarity.trim().length >= 3) {
      similarities.push([
        currP1,
        currP2,
        [
          {
            username: props.username,
            similarity: similarity.trim()
          }
        ]
      ]);

      setProgressStyle({
        width: `${parseInt((similarities.length / props.numQs) * 100)}%`
      });

      // clear out the input
      setSimilarity("");

      if (prompts.length > 0) {
        // still have prompts to go
        let nextPrompt = prompts.pop();
        setCurrP1(nextPrompt[0]);
        setCurrP2(nextPrompt[1]);
        setPrompts(prompts);
      } else {
        if (solo) {
          // set this player's responses
          props.onSetResponses(similarities);

          // redirect to view results
          setRedirectResults(true);
        } else {
          // push responses to server
          submitSimilarities(props.code, props.username, similarities);

          // redirect to waiting to wait until all players done
          setRedirectWaiting(true);
        }
      }
    }
  }

  return (
    <DocumentTitle title="MindSpring | Results">
      <div>
        {redirectHome && <Redirect to="/" />}
        {redirectResults && <Redirect to="/solo/results" />}
        {redirectWaiting && (
          <Redirect to={`/multiplayer/preresults/${props.code}`} />
        )}
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="progress mb-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={progressStyle}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 d-flex justify-content-center align-items-center text-center border_bisection">
                {currP1.type === "quote" && (
                  <Quote quote={currP1.quote} author={currP1.author} />
                )}
                {currP1.type === "picture" && <Image url={currP1.url} />}
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-center align-items-center text-center">
                {currP2.type === "quote" && (
                  <Quote quote={currP2.quote} author={currP2.author} />
                )}
                {currP2.type === "picture" && <Image url={currP2.url} />}
              </div>
              <div className="mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="text-center">
                      <label htmlFor="similarityField">
                        Come Up with a Similarity
                      </label>
                    </div>
                    <div className="">
                      <input
                        type="text"
                        className="form-control text-center"
                        id="similarityField"
                        placeholder="..."
                        max="12"
                        autoFocus={true}
                        value={similarity}
                        onChange={handleChangeSimilarity}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DocumentTitle>
  );
}
