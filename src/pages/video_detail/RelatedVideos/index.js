import React from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axiosInstance";
import Loader from "components/Loader";
import Card from "components/Card";

function RelatedVideos(props) {
  const { videoId } = props;

  const fetctRelatedVideos = async () =>
    await axios.get(
      `search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=12`,
    );

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["relatedVideos", videoId], fetctRelatedVideos, {
    staleTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;

  return (
    <ul>
      {videos.data.items.map((item) => (
        <Card
          snippet={item.snippet}
          videoId={`${item.id.videoId}`}
          orientation="horizontal"
          key={videoId}
        />
      ))}
    </ul>
  );
}

export default RelatedVideos;
