import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axiosInstance";
import "./channelInfo.scss";

function ChannelInfo(props) {
  const { channelId, title } = props;

  const fetchChannelById = async () =>
    await axios.get(`/channels?part=snippet&id=${channelId}`);

  const { isLoading, data, error } = useQuery(
    ["channel", channelId],
    fetchChannelById,
    {
      staleTime: 60 * 5 * 1000,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="channel-info">
      {!isLoading ? (
        <img
          src={data.data.items[0].snippet.thumbnails.default.url}
          alt="channel-thumbnail"
          className="channel-thumbnail"
        />
      ) : (
        <div className="temporary-thumbnail">{title[0]}</div>
      )}
      <h3 className="channel-info__title">{title}</h3>
    </div>
  );
}

export default ChannelInfo;
