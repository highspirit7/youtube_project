import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { useYoutubeApi } from "contexts/YoutubeApiContext";
import Card from "components/card";
import Loader from "components/loader";
import ErrorPage from "components/errorPage";

import "./videos_found.scss";
import InvisibleBottom from "components/invisibleBottom";

function VideosFound(props) {
  const params = useParams();
  const { keyword } = params;
  const { youtubeApi } = useYoutubeApi();

  const fetchFoundVideosByKeyword = async ({ pageParam }) => {
    return pageParam
      ? youtubeApi.search({
          params: {
            part: "snippet",
            maxResults: 25,
            q: keyword,
            type: "video",
            pageToken: pageParam,
          },
        })
      : youtubeApi.search({
          params: {
            part: "snippet",
            maxResults: 25,
            q: keyword,
            type: "video",
          },
        });
  };

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["foundVideos", keyword],
      queryFn: fetchFoundVideosByKeyword,
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
      <main className="main-videos-found">
        {data?.pages.map((page, index) => {
          const { data } = page;
          return data.items.map((item) => {
            const { id, snippet } = item;
            return (
              <Card
                snippet={snippet}
                videoId={id.videoId}
                key={id.videoId}
                orientation="horizontal"
                biggerThumbnail
              />
            );
          });
        })}
      </main>
      {isFetchingNextPage ? <Loader /> : <InvisibleBottom ref={ref} />}
    </>
  );
}

export default VideosFound;
