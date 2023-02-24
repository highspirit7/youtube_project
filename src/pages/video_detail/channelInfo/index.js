import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useYoutubeApi } from "contexts/YoutubeApiContext";
import "./channelInfo.scss";

function ChannelInfo(props) {
  const { channelId, title } = props;
  const { youtubeApi } = useYoutubeApi();

  const fetchChannelById = async () =>
    youtubeApi.channels({
      params: {
        part: "snippet",
        id: channelId,
      },
    });

  const { isLoading, data, error } = useQuery(
    ["channel", channelId],
    fetchChannelById,
    {
      staleTime: 60 * 5 * 1000,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading || error) {
    return (
      <div className="channel-info">
        <div className="temporary-thumbnail">{title[0]}</div>
        <h3 className="channel-info__title">{title}</h3>
      </div>
    );
  }

  return (
    <div className="channel-info">
      <img
        src={data.data.items[0].snippet.thumbnails.default.url}
        alt="channel-thumbnail"
        className="channel-thumbnail"
      />

      <h3 className="channel-info__title">{title}</h3>
    </div>
  );
}

export default ChannelInfo;
