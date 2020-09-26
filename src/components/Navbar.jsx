import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage } from "../app/countSlice";
import { getCharacter } from "rickmortyapi";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  const page = useSelector((state) => state.count.page);
  const pagesNum = useSelector((state) => state.count.pagesNum);
  const dispatch = useDispatch();

  const handleNav = (dir) => {
    switch (dir) {
      case "next":
        if (page < pagesNum) dispatch(nextPage());
        break;
      case "prev":
        if (page > 1) dispatch(prevPage());
        break;
    }
  };

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
          page >= pagesNum ? { display: "none" } : { display: "inline-block" }
        }
        onClick={() => handleNav("next")}
      >
        <Button variant="outline-success">Next</Button>
      </Link>
    </nav>
  );
};

export default Navbar;
