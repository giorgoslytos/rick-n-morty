import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "../../app/apiSlice";
import styles from "./Counter.module.css";
import { getCharacter } from "rickmortyapi";
import { Button } from "react-bootstrap";
import CharCard from "../../components/CharCard/CharCard";
import { Link } from "react-router-dom";

export function Counter() {
  const count = useSelector((state) => state.api.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();

  const fetchData = async () => {
    setCharacters(await getCharacter({ page }));
  };

  const handleNav = (dir) => {
    switch (dir) {
      case "next":
        if (page < characters.info.pages) setPage(page + 1);
        break;
      case "prev":
        if (page > 1) setPage(page - 1);
        break;
    }
  };

  const fetchMaxPages = async () => {
    setMaxPage((await getCharacter())?.info?.pages);
  };

  useEffect(() => {
    setMaxPage(fetchMaxPages());
  }, []);

  useEffect(() => {
    fetchData();
    setPage(
      Number(
        window.location.pathname.slice(6, window.location.pathname.length)
          ? window.location.pathname.slice(6, window.location.pathname.length)
          : 1
      )
    );
  }, [page]);

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  return (
    <div className="container">
      <div className="h3 mt-5 mb-0">Welcome to the</div>
      <div className="display-3 mb-3">Rick N Morty Universe</div>
      {page > maxPage || page <= 0 ? (
        <div>Not a valid query string</div>
      ) : (
        <>
          <nav
            className={`d-flex justify-content-${
              page > 1 ? "between" : "end"
            } my-5`}
          >
            <Link
              to={`page=${page === 1 ? 1 : page - 1}`}
              style={
                page <= 1 ? { display: "none" } : { display: "inline-block" }
              }
              onClick={() => handleNav("prev")}
            >
              <Button variant="outline-success">Previous</Button>
            </Link>
            <Link
              to={`page=${page + 1}`}
              style={
                page >= characters?.info?.pages
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
              onClick={() => handleNav("next")}
            >
              <Button variant="outline-success">Next</Button>
            </Link>
          </nav>
          <div className="row">
            {characters?.results?.map((res) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 my-3"
                key={res.id}
              >
                <CharCard props={res} />
              </div>
            ))}
          </div>
          <nav
            className={`d-flex justify-content-${
              page > 1 ? "between" : "end"
            } my-5`}
          >
            <Link
              to={`page=${page === 1 ? 1 : page - 1}`}
              style={page <= 1 ? { display: "none" } : { display: "flex" }}
            >
              <Button
                onClick={() => handleNav("prev")}
                variant="outline-success"
              >
                Previous
              </Button>
            </Link>
            <Link
              to={`page=${page + 1}`}
              style={
                page >= characters?.info?.pages
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
            >
              <Button
                onClick={() => handleNav("next")}
                variant="outline-success"
              >
                Next
              </Button>
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}
// dispatch(incrementAsync(Number(incrementAmount) || 0))
