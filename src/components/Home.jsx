import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPage, setTotalPages } from "../app/countSlice";
import { getCharacter } from "rickmortyapi";
import CharCard from "./CharCard";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export function Counter() {
  const page = useSelector((state) => state.count.page);
  const pagesNum = useSelector((state) => state.count.pagesNum);
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    setCharacters(await getCharacter({ page }));
  };

  const fetchMaxPages = async () => {
    dispatch(setTotalPages((await getCharacter())?.info?.pages));
    // setMaxPage((await getCharacter())?.info?.pages);
  };

  useEffect(() => {
    fetchMaxPages();
  }, []);

  useEffect(() => {
    dispatch(setPage(Number(id || 1)));
    fetchData();
  }, [page]);

  return (
    <div className="container">
      <div className="h3 mt-5 mb-0">Welcome to the</div>
      <div className="display-3 mb-3">Rick N Morty Universe</div>
      {page > pagesNum || page <= 0 ? (
        <div>Not a valid query string</div>
      ) : (
        <>
          <Navbar />
          <div className="row" style={{ textAlign: "-webkit-center" }}>
            {characters?.results?.map((res) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 my-3"
                key={res.id}
              >
                <CharCard props={res} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
// dispatch(incrementAsync(Number(incrementAmount) || 0))
