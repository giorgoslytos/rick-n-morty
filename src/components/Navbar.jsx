import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
  nextPage,
  prevPage,
} from "../app/countSlice";
import { getCharacter } from "rickmortyapi";
import { Button } from "react-bootstrap";
import CharCard from "./CharCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  const page = useSelector((state) => state.count.page);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState("2");
  const [characters, setCharacters] = useState([]);
  // const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();

  const fetchData = async () => {
    setCharacters(await getCharacter({ page }));
  };

  const handleNav = (dir) => {
    switch (dir) {
      case "next":
        if (page < characters.info.pages) dispatch(nextPage());
        break;
      case "prev":
        if (page > 1) dispatch(prevPage());
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
    // setPage(
    //   Number(
    //     window.location.pathname.slice(6, window.location.pathname.length)
    //       ? window.location.pathname.slice(6, window.location.pathname.length)
    //       : 1
    //   )
    // );
  }, [page]);

  return (
    <nav
      className={`d-flex justify-content-${page > 1 ? "between" : "end"} my-5`}
    >
      <Link
        to={`page=${page === 1 ? 1 : page - 1}`}
        style={page <= 1 ? { display: "none" } : { display: "inline-block" }}
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
  );
};

export default Navbar;
