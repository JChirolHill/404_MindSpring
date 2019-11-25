import React from 'react';

export default function Image(props) {
  return (
    <>
      <div className="rand_content rand_picture">
        <img src={props.url} alt="Random"/>
      </div>
    </>
  );
}
