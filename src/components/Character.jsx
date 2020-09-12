import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CharCard from "./CharCard";
import { getCharacter } from "rickmortyapi";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Character = () => {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();
  const page = useSelector((state) => state.count.page);
  const fetchCharacter = async () => {
    setCharacter(await getCharacter(Number(id)));
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className="container">
      <div>
        {character ? (
          <div className="text-center">
            <div className="display-3 m-5">{character.name}</div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <img src={character.image} style={{ maxWidth: "600px" }} />

              <div className="text-left m-4">
                <p>
                  <b>Gender: </b>
                  {character.gender}
                </p>
                <p>
                  <b>Species: </b>
                  {character.species}
                </p>
                <p>
                  <b>Status: </b>
                  {character.status}
                </p>
                <p>
                  <b>Location: </b>
                  {character.location.name}
                </p>
                <p>
                  <b>Origin: </b>
                  {character.origin.name}
                </p>
                <Link to={`/page=${page}`}>
                  <Button variant="info" className="mt-3">
                    Go back
                  </Button>
                </Link>
              </div>
            </div>
            {/* <Card
              style={{
                width: "400px",
                margin: "auto",
                flexDirection: "row",
              }}
            >
              <Card.Img variant="top" src={character.image} />
              <Card.Body
                style={{
                  padding: "0!important",
                  margin: "0 0 0 2rem",
                }}
              >
                <div className="text-left">
                  <Card.Text>
                    <b>Gender: </b>
                    {character.gender}
                  </Card.Text>
                  <Card.Text>
                    <b>Species: </b>
                    {character.species}
                  </Card.Text>
                  <Card.Text>
                    <b>Status: </b>
                    {character.status}
                  </Card.Text>
                  <Card.Text>
                    <b>Location: </b>
                    {character.location.name}
                  </Card.Text>
                  <Card.Text>
                    <b>Origin: </b>
                    {character.origin.name}
                  </Card.Text>
                </div>
                <Link to={`/page=${page}`}>
                  <Button variant="info" className="mt-3">
                    Go back
                  </Button>
                </Link>
              </Card.Body>
            </Card> */}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Character;
