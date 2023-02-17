import React from "react";
import { Link } from "react-router-dom";

import "./notFound.scss";

function NotFound(props) {
  return (
    <div className="not-found-container">
      <div>
        <img
          src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png"
          alt="not-found-image"
          className="image"
        />
        <h1>This page is not available. Sorry about that.</h1>
        <Link to="/">
          <div className="button">Return to Youtube Home</div>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
