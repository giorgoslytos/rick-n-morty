import React, { useEffect, useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getLocation } from "rickmortyapi";
import useData from "../utils/useData";

const Locations = () => {
  const [data, dataCount] = useData("locations");
  return (
    <div className="container mb-5">
      <div>
        <div className="display-3 text-center m-5">Locations</div>
        <div className="h4 mb-4">
          <b>{dataCount}</b> locations were found
        </div>
      </div>
      {data?.map((location) => (
        <Accordion defaultActiveKey="0" className="m-0" key={location.id}>
          <Card>
            <Card.Header className="bg-info p-0">
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="1"
                className="text-light w-100 text-left p-2 px-3"
              >
                {location.name}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3 bg-white">
                    <div>
                      <b>Type: </b>
                      {location.type}
                    </div>
                    <div>
                      <b>Dimension: </b>
                      {location.dimension}
                    </div>
                    <div className="mt-3">
                      <Link to={`/location/${location.id}`}>
                        Go to Location Page
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

export default Locations;
