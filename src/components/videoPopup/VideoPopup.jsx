import React from "react";
import ReactPlayer from "react-player/youtube";
import { IoIosCloseCircleOutline } from "react-icons/io";

import "./videoPopup.scss";

const VideoPopup = ({ data }) => {
  const [ show, setShow, videoId, setVideoId ] = data;
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <IoIosCloseCircleOutline className="closeBtn" onClick={hidePopup}/>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default VideoPopup;
