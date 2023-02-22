import React from "react";
import { useParams, useLocation } from "react-router-dom";

import "./video_detail.scss";
import ChannelInfo from "pages/video_detail/ChannelInfo";
import RelatedVideos from "./RelatedVideos";

function VideoDetail(props) {
  const {
    state: { video },
  } = useLocation();
  const params = useParams();
  const { video_id } = params;

  return (
    <main className="detail-wrapper">
      <article className="detail-primary">
        <iframe
          src={`https://www.youtube.com/embed/${video_id}`}
          title="YouTube video player"
          allowFullScreen
          className="embedded-video"
        ></iframe>

        <div className="detail-primary__info">
          <h2>{video.title}</h2>
          <ChannelInfo channelId={video.channelId} title={video.channelTitle} />
          <pre>{video.description}</pre>
        </div>
      </article>
      <aside className="detail-secondary">
        <RelatedVideos videoId={video_id} />
      </aside>
    </main>
  );
}

export default VideoDetail;
