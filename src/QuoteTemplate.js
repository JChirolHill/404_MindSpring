import React from 'react';

export default function Quote(props) {
  return (
    <>
      <div className="rand_content rand_quote">
        <p>{props.quote}</p>
        <p>-{props.author}</p>
      </div>
    </>
  );
}
