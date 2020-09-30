import React, { useEffect, useState } from "react";
import { ListGroup, Accordion, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEpisode } from "rickmortyapi";
import useData from "../utils/useData";

const Episodes = () => {
  const [episodes, episodeCount] = useData("episodes");

  return (
    <div className="container mb-5">
      <div className="display-3 text-center m-5">Episodes</div>
      <div className="h4 mb-4">
        <b>{episodeCount}</b> episodes were found
      </div>
      {episodes?.map((episode) => (
        <Accordion defaultActiveKey="0" className="m-0" key={episode.id}>
          <Card>
            <Card.Header className="bg-info p-0">
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="1"
                className="text-light w-100 text-left p-2 px-3"
              >
                {episode.name}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3 bg-white">
                    <div>
                      <b>Episode: </b>
                      {episode.episode}
                    </div>
                    <div>
                      <b>Air Date: </b>
                      {episode.air_date}
                    </div>
                    <div className="mt-3">
                      <Link to={`/episode/${episode.id}`}>
                        Go to Episode Page
                      </Link>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
      <Link to={`/`}>
        <Button variant="outline-primary" className="my-5">
          Go home
        </Button>
      </Link>
    </div>
  );
};

export default Episodes;
