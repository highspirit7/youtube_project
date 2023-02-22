import React from "react";
import "./errorPage.scss";

function ErrorPage(props) {
  const { error } = props;
  return (
    <main className="main-error">
      <h1>Error: {error.message}</h1>
    </main>
  );
}

export default ErrorPage;
