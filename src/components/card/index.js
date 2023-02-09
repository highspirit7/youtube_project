import React from "react";
import { useNavigate } from "react-router-dom";

import "./card.scss";

function Card(props) {
  const { snippet, videoId } = props;
  const { publishedAt, title, channelTitle, thumbnails } = snippet;
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/videos/watch/${videoId}`);
  };

  return (
    <div className="card" onClick={onClickCard}>
      <img src={thumbnails.medium.url} className={"card__thumbnail"} />
      <h3>{title}</h3>
      <div>{channelTitle}</div>
      <div>{publishedAt}</div>
    </div>
  );
}

export default Card;
