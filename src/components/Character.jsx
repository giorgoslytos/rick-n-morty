import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CharCard from "./CharCard";
import { getCharacter, getEpisode } from "rickmortyapi";
import { Card, Button, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";

const Character = () => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const { id } = useParams();
  const page = useSelector((state) => state.count.page);
  const fetchCharacter = async () => {
    setCharacter(await getCharacter(Number(id)));
  };

  const fetchEpisodes = async () => {
    const epiArr = [];
    for (let i = 0; i < character?.episode?.length; i++) {
      epiArr.push(getEpisode(Number(character?.episode[i]?.slice(40))));
    }
    await Promise.all(epiArr).then((epi) => setEpisodes(epi));
  };

  useEffect(() => {
    if (character?.episode) fetchEpisodes();
  }, [character]);

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
                <b>Location: </b>
                <p>
                  {character.location.name !== "unknown" ? (
                    <Link
                      to={"/location/" + character?.location?.url?.slice(41)}
                    >
                      {character.location.name}
                    </Link>
                  ) : (
                    "unknown"
                  )}
                </p>
                <p>
                  <b>Origin: </b>
                  {character.origin.name !== "unknown" ? (
                    <Link to={"/location/" + character?.origin?.url?.slice(41)}>
                      {character.origin.name}
                    </Link>
                  ) : (
                    "unknown"
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Accordion defaultActiveKey="0" className="mt-3">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Episodes
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {episodes?.map((epi) => (
                <div key={epi.id} className="mb-4 mt-2">
                  <Link to={`/episode/${epi.id}`}>
                    <b>Episode: {"    "}</b>
                    {epi.episode}

                    <div className="mx-4">
                      <b>Name: </b>
                      {epi.name}
                    </div>
                    <div className="mx-4">
                      <b>Air Date: </b>
                      {epi.air_date}
                    </div>
                  </Link>
                </div>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Link to={`/page=${page}`}>
        <Button variant="info" className="mt-3 mb-5">
          Go home
        </Button>
      </Link>
    </div>
  );
};

export default Character;
