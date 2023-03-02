import React from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "utils/dayjs";
import "./card.scss";

function Card(props) {
  const {
    snippet,
    videoId,
    orientation = "vertical",
    biggerThumbnail = false,
  } = props;
  const { publishedAt, title, channelTitle, thumbnails } = snippet;
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/videos/watch/${videoId}`, { state: { video: snippet } });
  };

  return (
    <li className={`card ${orientation}`} onClick={onClickCard}>
      <img
        src={thumbnails.medium.url}
        className={`card__thumbnail${biggerThumbnail ? "--bigger" : ""}`}
      />
      <div className="card__info">
        <h3>{title}</h3>
        <div className="card__info--channel">{channelTitle}</div>
        <div className="card__info--published">
          {dayjs(publishedAt).fromNow()}
        </div>
      </div>
    </li>
  );
}

export default Card;
