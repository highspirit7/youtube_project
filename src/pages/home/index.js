import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import axios from "axiosInstance";
import Card from "components/Card";
import Loader from "components/Loader";
import "./home.scss";

function Home(props) {
  // const YOUTUBE_DATA_API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

  const fetchMostPopularVideos = async ({ pageParam }) => {
    if (pageParam) {
      return await axios.get(
        `/videos?part=snippet&chart=mostPopular&maxResults=25&pageToken=${pageParam}`,
      );
    }

    return await axios.get(
      `/videos?part=snippet&chart=mostPopular&maxResults=25`,
    );
  };

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["mostPopular"],
      queryFn: fetchMostPopularVideos,
      staleTime: 60 * 5 * 1000,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        return lastPage.data?.nextPageToken;
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
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
