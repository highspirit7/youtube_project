import React from "react";

function VideoDetail(props) {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/AKn3AWxPa9Y"
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoDetail;
