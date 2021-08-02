import React from "react";
import "./Badge.scss";

function Badge(props) {
  const { index } = props;
  return <span className="badge">{index}</span>;
}

export default Badge;
