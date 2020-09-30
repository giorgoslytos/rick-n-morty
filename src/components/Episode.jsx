import React, { useEffect, useState } from "react";
import { ListGroup, Accordion, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getCharacter, getEpisode } from "rickmortyapi";

const Episode = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState();
  const [characters, setCharacters] = useState();

  const fetchEpisode = async () => {
    setEpisode(await getEpisode(Number(id)));
  };

  const fetchCharacters = async () => {
    const charArr = [];
    for (let i = 0; i < episode?.characters?.length; i++) {
      charArr.push(getCharacter(Number(episode?.characters[i]?.slice(42))));
    }
    await Promise.all(charArr).then((res) => setCharacters(res));
  };

  useEffect(() => {
    fetchEpisode();
  }, []);

  useEffect(() => {
    if (episode?.characters) fetchCharacters();
  }, [episode]);

  return (
    <div className="container">
      <div className="display-3 text-center m-5">{episode?.name}</div>
      <ListGroup>
        <ListGroup.Item>
          <b>Episode: </b> {episode?.episode}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Air Date: </b> {episode?.air_date}
        </ListGroup.Item>
      </ListGroup>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header className="bg-info p-0">
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="1"
              className="text-white p-3 w-100 text-left"
            >
              Characters
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="row">
                {characters?.map((res) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3"
                    key={res.id}
                  >
                    <Card>
                      <Link to={`/character/${res.id}`}>
                        <Card.Img
                          variant="bottom"
                          src={res.image}
                          alt=""
                          className="card-img-top"
                        />
                        <Card.Header>{res.name}</Card.Header>
                      </Link>
                    </Card>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Link to={`/`}>
        <Button variant="info" className="mt-3 mb-5">
          Go home
        </Button>
      </Link>
    </div>
  );
};

export default Episode;
