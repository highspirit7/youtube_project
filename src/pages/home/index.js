import React, { useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import Card from "components/Card";
import Loader from "components/Loader";
import "./home.scss";

function Home(props) {
  const YOUTUBE_DATA_API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

  const fetchMostPopularVideos = async ({ pageParam }) => {
    if (pageParam) {
      return await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${YOUTUBE_DATA_API_KEY}&pageToken=${pageParam}`,
      );
    }

    return await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${YOUTUBE_DATA_API_KEY}`,
    );
  };

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["mostPopular"],
      queryFn: fetchMostPopularVideos,
      staleTime: 60 * 3 * 1000,
      getNextPageParam: (lastPage) => {
        return lastPage.data?.nextPageToken;
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("inView", inView);

      fetchNextPage();
    }
  }, [inView]);

  if (status === "loading")
    return (
      <main className="main-exceptional">
        <Loader />
      </main>
    );

  if (status === "error")
    return (
      <main className="main-exceptional">
        <h1>Error: {error.message}</h1>
      </main>
    );

  return (
    <>
      <main className="main-home">
        {data?.pages.map((page, index) => {
          const { data } = page;
          return data.items.map((item) => {
            const { id, snippet } = item;

            return <Card snippet={snippet} videoId={id} key={id} />;
          });
        })}
      </main>
      {isFetchingNextPage ? (
        <Loader />
      ) : (
        <div ref={ref} className="invisible-bottom"></div>
      )}
    </>
  );
}

export default Home;