import React, { createContext, useContext } from "react";

import httpClient from "api/httpClient";
import YoutubeApi from "api/youtubeApi";

export const YoutubeApiContext = createContext();

const youtubeApi = new YoutubeApi(httpClient);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtubeApi }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
