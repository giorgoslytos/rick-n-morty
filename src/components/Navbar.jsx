import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage, setPage } from "../app/countSlice";
import { getCharacter } from "rickmortyapi";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = ({ pos }) => {
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
      case "first":
        if (page !== 1) dispatch(setPage(1));
        break;
      case "last":
        if (page !== pagesNum) dispatch(setPage(pagesNum));
        break;
    }
  };

  return (
    <div className="mb-5">
      {pos === "top" ? (
        <nav className={"d-flex justify-content-between mb-0 mt-5"}>
          <Link
            to="/locations"
            style={{ display: "inline-block" }}
            onClick={() => handleNav("prev")}
          >
            <Button variant="info">All Locations</Button>
          </Link>
          <Link
            to="/episodes"
            style={{ display: "inline-block" }}
            onClick={() => handleNav("next")}
          >
            <Button variant="info">All Episodes</Button>
          </Link>
        </nav>
      ) : (
        ""
      )}

      <nav
        className={`d-flex justify-content-${
          page > 1 ? "between" : "end"
        } my-5`}
      >
        <div
          style={page <= 1 ? { display: "none" } : { display: "inline-block" }}
        >
          <Link
            to={`page=1`}
            className="mr-2"
            onClick={() => handleNav("first")}
          >
            <Button variant="outline-success">{"<<"}</Button>
          </Link>
          <Link
            to={`page=${page === 1 ? 1 : page - 1}`}
            onClick={() => handleNav("prev")}
          >
            <Button variant="outline-success">Previous</Button>
          </Link>
        </div>
        <div
          style={
            page >= pagesNum ? { display: "none" } : { display: "inline-block" }
          }
        >
          <Link to={`page=${page + 1}`} onClick={() => handleNav("next")}>
            <Button variant="outline-success">Next</Button>
          </Link>
          <Link
            to={`page=${pagesNum}`}
            className="ml-2"
            onClick={() => handleNav("last")}
          >
            <Button variant="outline-success">{">>"}</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
