import React from "react";
import { useNavigate } from "react-router-dom";

import "./card.scss";

function Card(props) {
  const { snippet, videoId, orientation = "vertical" } = props;
  const { publishedAt, title, channelTitle, thumbnails } = snippet;
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/videos/watch/${videoId}`);
  };

  return (
    <div className={`card ${orientation}`} onClick={onClickCard}>
      <img src={thumbnails.medium.url} className={"card__thumbnail"} />
      <div className="card__info">
        <h3>{title}</h3>
        <div className="card__info--channel">{channelTitle}</div>
        <div className="card__info--published">{publishedAt}</div>
      </div>
    </div>
  );
}

export default Card;
