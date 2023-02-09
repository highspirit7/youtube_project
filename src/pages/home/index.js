import React from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "components/card";
import "./home.scss";

function Home(props) {
  const YOUTUBE_DATA_API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
  const fetchMostPopularVideos = async () =>
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${YOUTUBE_DATA_API_KEY}`,
    ).then((res) => res.json());
  const {
    isLoading,
    isError,
    data: videos,
    error,
  } = useQuery(["mostPopular"], fetchMostPopularVideos, {
    staleTime: 60 * 3 * 1000,
  });

  if (isLoading)
    return (
      <main className="main-home">
        <h1>is Loading...</h1>
      </main>
    );
  else if (isError)
    return (
      <main className="main-home">
        <h1>Error: {error.message}</h1>
      </main>
    );
  else
    return (
      <main className="main-home">
        {videos.items.map((item) => {
          const { id, snippet } = item;

          return <Card snippet={snippet} videoId={id} key={id} />;
        })}
      </main>
    );
}

export default Home;
