import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch.jsx";
import "./HeroBanner.scss";
import Image from "../../../components/lazyLoadImg/Image.jsx";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";

const HeroBanner = () => {
  // states or instances
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  // inits
  const { data, loading, error } = useFetch("/movie/upcoming");

  useEffect(() => {
    //triggers when data changes i.e after api response is received
    const bg =
      url.backdrop +
      data?.results?.[Math?.floor(Math?.random() * 20)]?.["backdrop_path"];
    setBackground(bg);
  }, [data]);

  // methods
  const searchQueryHandler = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && ( //render when loading is false
        <div className="backdrop-img">
          <Image src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="content">
          <span className="title">Welcome.</span>
          <span className="sub-title">
            Millions of movies, TV shows and people to discover. Explore now
          </span>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search for Movie or TV show..."
              onKeyUp={searchQueryHandler}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button">Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
