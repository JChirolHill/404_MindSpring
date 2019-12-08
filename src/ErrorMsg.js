import React from "react";

export default function ErrorMsg(props) {
  return (
    <div className="row col-12 justify-content-center">
      <small className="error_msg">{props.error}</small>
    </div>
  );
}
