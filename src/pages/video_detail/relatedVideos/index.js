import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useYoutubeApi } from "contexts/YoutubeApiContext";
import Loader from "components/loader";
import Card from "components/card";
import "./relatedVideos.scss";

function RelatedVideos(props) {
  const { videoId } = props;
  const { youtubeApi } = useYoutubeApi();

  const fetchRelatedVideos = async () =>
    youtubeApi
      .search({
        params: {
          part: "snippet",
          relatedToVideoId: videoId,
          type: "video",
          maxResults: 12,
        },
      })
      .then((res) => res.data.items);

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["relatedVideos", videoId], fetchRelatedVideos, {
    staleTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="related-videos__loader-wrapper">
        <Loader />
      </div>
    );

  if (error) {
    return (
      <div className="related-videos__loader-wrapper">{error.message}</div>
    );
  }

  return (
    <ul>
      {videos.map((item) => (
        <Card
          snippet={item.snippet}
          videoId={`${item.id.videoId}`}
          orientation="horizontal"
          key={item.id.videoId}
        />
      ))}
    </ul>
  );
}

export default RelatedVideos;
