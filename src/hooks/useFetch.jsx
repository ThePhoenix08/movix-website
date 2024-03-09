import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api.js";

const useFetch = (url) => {
  //states or instances
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((response) => {
        setLoading(false);
        setData(response);
      })
      .catch((error) => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]); //gets called whenever url changes

  return { data, loading, error };
};

export default useFetch;
