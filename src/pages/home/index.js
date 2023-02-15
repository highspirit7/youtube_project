import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import axios from "axiosInstance";
import Card from "components/Card";
import Loader from "components/Loader";
import ErrorPage from "components/ErrorPage";
import "./home.scss";

function Home(props) {
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
      <main className="main-loader">
        <Loader />
      </main>
    );

  if (status === "error") return <ErrorPage error={error} />;

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
        <div className="invisible-bottom" ref={ref}></div>
      )}
    </>
  );
}

export default Home;
