import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "pages/home";

import "./index.css";
import VideosFound from "pages/videos_found";
import VideoDetail from "pages/video_detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/videos/:video_name",
    element: <VideosFound />,
  },
  {
    path: "/videos/:video_name/:youtube_video_id",
    element: <VideoDetail />,
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
