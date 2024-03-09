import React from "react";
import { useParams } from "react-router-dom";

import "./Details.scss";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendations from "./carousels/Recommendations";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data: videoData, loading: videoLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );
  const { data: creditData, loading: creditLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      {/* passing only trailer in video */}
      <DetailsBanner video={videoData?.results?.[0]} crew={creditData?.crew} />
      <Cast data={creditData?.cast} loading={creditLoading} />
      <VideosSection data={videoData} loading={videoLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
