import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "pages/main";

import "./index.css";
import VideosFound from "pages/vidoes_found";
import VideoDetail from "pages/video_detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
