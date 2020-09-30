import { useState, useEffect } from "react";
import { getEpisode, getLocation } from "rickmortyapi";

const useData = (type) => {
  const [data, setData] = useState([]);
  const [dataPages, setDataPages] = useState(0);
  const [dataCount, setDataCount] = useState(0);

  const fetchData = async () => {
    let getData = null;
    switch (type) {
      case "episodes":
        getData = getEpisode;
        break;
      case "locations":
        getData = getLocation;
        break;
      default:
        throw new Error(
          'Incorrect parameter on useData hook.\nUse either "episodes" or "locations" as a parameter'
        );
    }

    const firstPage = await getData();
    setDataCount(firstPage.info.count);
    setDataPages(firstPage.info.pages);
    let epis = firstPage.results;
    for (let i = 2; i <= firstPage.info.pages; i++) {
      epis = [...epis, ...(await getData({ page: i })).results];
    }
    setData(epis);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, dataCount];
};
export default useData;
