import React from "react";
import DocumentTitle from "react-document-title";
import { Quote, Image } from "./PromptTemplates";

export default function Examples() {
  const examples = [
    [
      {
        type: "picture",
        url: "https://picsum.photos/id/159/5184/2551"
      },
      {
        type: "picture",
        url: "https://picsum.photos/id/158/4836/3224"
      },
      [
        {
          similarity: "Beautiful light effects"
        }
      ]
    ],
    [
      {
        type: "picture",
        url: "https://picsum.photos/id/16/2500/1667"
      },
      {
        author: "Thomas Aquinas",
        quote:
          "The greatest thing about being a scientist is you never have to grow up.",
        type: "quote"
      },
      [
        {
          similarity: "The sea stays full of possibilities all your life"
        }
      ]
    ],
    [
      {
        type: "picture",
        url: "https://picsum.photos/id/162/1500/998"
      },
      {
        type: "picture",
        url: "https://picsum.photos/id/161/4240/2832"
      },
      [
        {
          similarity:
            "A tree log as a microcosm of a shore, with so much life teeming at its edges"
        }
      ]
    ],
    [
      {
        type: "picture",
        url: "https://picsum.photos/id/164/1200/800"
      },
      {
        type: "picture",
        url: "https://picsum.photos/id/163/2000/1333"
      },
      [
        {
          similarity: "Richly colored lifestyle"
        }
      ]
    ]
  ];

  return (
    <DocumentTitle title="MindSpring | Examples">
      <div id="results" className="mx-auto">
        <h2 className="text-center">Sample Responses</h2>
        <h5 className="text-center">
          Draw inspiration from these examples, but let your creativity do the
          rest...
        </h5>
        {examples.map((promptSet, index) => (
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
                  <h5 className="text-center">{similarity.similarity}</h5>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DocumentTitle>
  );
}
