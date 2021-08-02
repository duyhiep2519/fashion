import React from "react";
import "./Section.scss";

function Section(props) {
  const { title, subtitle } = props;
  return (
    <div className="section-titles">
      <span className="section-title">{title}</span>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}

export default Section;
