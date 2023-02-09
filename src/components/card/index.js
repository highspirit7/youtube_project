import React from "react";
import "./card.scss";

function Card(props) {
  const { snippet } = props;
  const { id, publishedAt, title, channelTitle, thumbnails } = snippet;

  return (
    <div className="card">
      <img src={thumbnails.medium.url} className={"card__thumbnail"} />
      <h3>{title}</h3>
      <div>{channelTitle}</div>
      <div>{publishedAt}</div>
    </div>
  );
}

export default Card;
