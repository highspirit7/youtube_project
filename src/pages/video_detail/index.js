import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axios from "api/httpClient";
import Loader from "components/Loader";
import "./video_detail.scss";
import ChannelInfo from "pages/video_detail/ChannelInfo";
import RelatedVideos from "./RelatedVideos";

function VideoDetail(props) {
  const params = useParams();
  const { video_id } = params;

  const fetchListByVideoId = async () =>
    await axios.get(`/videos?part=snippet&id=${video_id}`);

  const {
    isLoading: isLoadingForSelectedVideo,
    error: selectedVideoError,
    data: selectedVideo,
  } = useQuery(["video", video_id], fetchListByVideoId, {
    staleTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
  });

  if (selectedVideoError) return <h1>Error: {selectedVideoError.message}</h1>;

  return (
    <div className="detail-wrapper">
      <div className="detail-primary">
        <iframe
          src={`https://www.youtube.com/embed/${video_id}`}
          title="YouTube video player"
          allowFullScreen
          className="embedded-video"
        ></iframe>
        {isLoadingForSelectedVideo ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="detail-primary__info">
            <h2>{selectedVideo.data.items[0].snippet.title}</h2>
            <ChannelInfo
              channelId={selectedVideo.data.items[0].snippet.channelId}
              title={selectedVideo.data.items[0].snippet.channelTitle}
            />
            <p>{selectedVideo.data.items[0].snippet.description}</p>
          </div>
        )}
      </div>
      <div className="detail-secondary">
        <RelatedVideos videoId={video_id} />
      </div>
    </div>
  );
}

export default VideoDetail;
