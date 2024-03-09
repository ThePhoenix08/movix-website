import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Image from "../../../components/lazyLoadImg/Image.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./PlayIcon.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";

const DetailsBanner = ({ video, crew }) => {
  const writerJobProfiles = ["Screenplay", "Story", "Writer"];
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const _genres = data?.genres?.map((genre) => genre.id);
  const directors = crew?.filter((item) => item.job === "Director");
  const writers = crew?.filter((item) => writerJobProfiles.includes(item.job));
  const [ show, setShow ] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div>
                <div className="backdrop-img">
                  <img src={url.backdrop + data.backdrop_path} alt="" />
                </div>
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Image
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Image className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div className="playbtn" onClick={() => {
                        setVideoId(video.key);
                        setShow(true);
                      }}>
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:{" "}</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:{" "}</span>
                          <span className="text">{dayjs(data.release_date).format("DD MMM, YYYY")}</span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:{" "}</span>
                          <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                        </div>
                      )}
                    </div>
                    {directors?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:{" "}</span>
                        <span className="text">
                          {directors.map((item) => item.name).join(", ")}
                        </span>
                      </div>
                    )}
                    {writers?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:{" "}</span>
                        <span className="text">
                          {writers.map((item) => item.name).join(", ")}
                        </span>
                      </div>
                    )}
                    {data.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator:{" "}</span>
                        <span className="text">
                          {data.created_by.map((item) => item.name).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup data={[ show, setShow, videoId, setVideoId ]} />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
