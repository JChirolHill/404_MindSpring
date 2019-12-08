import React, { useState, useEffect } from "react";
import DocumentTitle from "react-document-title";
import { Redirect } from "react-router-dom";
import { Quote, Image } from "./PromptTemplates";
import { getSimilarities } from "./APIFetcher";
import Loading from "./Loading";

export default function Results(props) {
  const [redirectHome, setRedirectHome] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  let code = props.code;

  // check if in URL
  if (!props.solo && !props.code) {
    code = props.match.params.code;
    props.onSetCode(code);
  }
  
  useEffect(() => {
    if (props.solo) {
      setLoading(false);
      if (!props.responses || props.responses.length === 0) {
        setRedirectHome(true);
      }
      console.log(props.responses);
      setResponses(props.responses);
    } else {
      getSimilarities(code).then(response => {
        setLoading(false);
        if (!response.message) {
          setResponses(response);
        } else {
          setRedirectHome(true);
        }
      });
    }
  }, [props.solo]);

  return (
    <DocumentTitle title="MindSpring | Results">
      {loading ? (
        <Loading />
      ) : (
        <div id="results" className="mx-auto">
          {redirectHome && <Redirect to="/" />}
          <h2 className="text-center">View Results</h2>
          {responses.map((promptSet, index) => (
            <div className="row" key={`response-${index}`}>
              <div className="col-12 col-md text-center my-2">
                <div className="row">
                  <div className="col col-md-12">
                    {promptSet[0].type === "quote" && (
                      <Quote
                        quote={promptSet[0].quote}
                        author={promptSet[0].author}
                      />
                    )}
                    {promptSet[0].type === "picture" && (
                      <Image url={promptSet[0].url} />
                    )}
                  </div>
                  <div className="col col-md-12">
                    {promptSet[1].type === "quote" && (
                      <Quote
                        quote={promptSet[1].quote}
                        author={promptSet[1].author}
                      />
                    )}
                    {promptSet[1].type === "picture" && (
                      <Image url={promptSet[1].url} />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md d-flex justify-content-center flex-column">
                {promptSet[2].map((similarity, index) => (
                  <div className="player-result" key={`similarity-${index}`}>
                    {!props.solo && <h4>{`${similarity.username}`} says...</h4>}
                    <h5
                      className={props.solo ? "text-center" : undefined}
                    >{`${similarity.similarity}`}</h5>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </DocumentTitle>
  );
}
