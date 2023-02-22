import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { useYoutubeApi } from "contexts/YoutubeApiContext";
import Card from "components/card";
import Loader from "components/loader";
import ErrorPage from "components/errorPage";
import "./home.scss";
import InvisibleBottom from "components/invisibleBottom";

function Home() {
  const { youtubeApi } = useYoutubeApi();

  const fetchMostPopularVideos = async ({ pageParam }) =>
    pageParam
      ? youtubeApi.videos({
          params: {
            part: "snippet",
            chart: "mostPopular",
            maxResults: 25,
            pageToken: pageParam,
          },
        })
      : youtubeApi.videos({
          params: {
            part: "snippet",
            chart: "mostPopular",
            maxResults: 25,
          },
        });

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["mostPopular"],
      queryFn: fetchMostPopularVideos,
      staleTime: 60 * 3 * 1000,
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
      <main>
        <ul className="main-home">
          {data?.pages.map((page, index) => {
            const { data } = page;
            return data.items.map((item) => {
              const { id, snippet } = item;

              return <Card snippet={snippet} videoId={id} key={id} />;
            });
          })}
        </ul>
      </main>
      {isFetchingNextPage ? <Loader /> : <InvisibleBottom ref={ref} />}
    </>
  );
}

export default Home;
