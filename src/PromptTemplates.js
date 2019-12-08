import React from "react";

export function Quote(props) {
  return (
    <>
      <div className="rand_content rand_quote">
        <p>{props.quote.replace(/<br(\/)*>/)}</p>
        <p>-{props.author}</p>
      </div>
    </>
  );
}

export function Image(props) {
  return (
    <>
      <div className="rand_content rand_picture">
        <img
          src={props.url.replace(/(\/[0-9]+){2}$/, "/200/200")}
          alt="Random"
        />
      </div>
    </>
  );
}
