import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useYoutubeApi } from "contexts/YoutubeApiContext";
import Loader from "components/Loader";
import Card from "components/Card";
import "./relatedVideos.scss";

function RelatedVideos(props) {
  const { videoId } = props;
  const { youtubeApi } = useYoutubeApi();

  const fetctRelatedVideos = async () =>
    youtubeApi.search({
      params: {
        part: "snippet",
        relatedToVideoId: videoId,
        type: "video",
        maxResults: 12,
      },
    });

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["relatedVideos", videoId], fetctRelatedVideos, {
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
      {videos.data.items.map((item) => (
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
