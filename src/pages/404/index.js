import React from "react";

import "./404page.scss";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="page404">
      <h1>404</h1>
      <p>SORRY! PAGE YOU ARE LOOKING CAN’T BE FOUND.</p>
      <span>
        Go back to the <Link to="/">homepage</Link>
      </span>
    </div>
  );
}

export default ErrorPage;
