import axios from "axios";

export default axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: { key: process.env.REACT_APP_YOUTUBE_DATA_API_KEY },
});
