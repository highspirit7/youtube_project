import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import axios from "axiosInstance";
import Card from "components/Card";
import Loader from "components/Loader";
import ErrorPage from "components/ErrorPage";

import "./videos_found.scss";

function VideosFound(props) {
  const params = useParams();
  const { keyword } = params;

  const fetchFoundVideosByKeyword = async ({ pageParam }) => {
    if (pageParam) {
      // TODO : need to assign keyword to q later
      return await axios.get(
        `/search?part=snippet&maxResults=25&q=surfing&pageToken=${pageParam}`,
      );
    }

    return await axios.get(`/search?part=snippet&maxResults=25&q=surfing`);
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
              <Card snippet={snippet} videoId={id.videoId} key={id.videoId} />
            );
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

export default VideosFound;
