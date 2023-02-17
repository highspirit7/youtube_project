import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "components/Layout";
import Home from "pages/home";
import VideosFound from "pages/videos_found";
import VideoDetail from "pages/video_detail";
import { SearchKeywordContextProvider } from "contexts/SearchKeywordContext";
import "./index.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <SearchKeywordContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/videos" element={<Home />} />
            <Route path="/videos/:keyword" element={<VideosFound />} />
            <Route path="/videos/watch/:video_id" element={<VideoDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchKeywordContextProvider>
  </QueryClientProvider>,
);
