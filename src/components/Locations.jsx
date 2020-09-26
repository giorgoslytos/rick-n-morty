import React, { useEffect, useState } from "react";
import { ListGroup, Accordion, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getLocation } from "rickmortyapi";

const Locations = () => {
  const [locations, setLocations] = useState();

  const fetchLocations = async () => {
    setLocations(await getLocation());
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return (
    <div className="container">
      <div>
        <div className="display-3 text-center m-5">Locations</div>
        <div className="h4 mb-4">{`${locations?.info.count} locations were found`}</div>
        {/* {locations?.results?.map((location) => (
        <>{location}</>
      ))} */}
      </div>
      {locations?.results.map((location) => (
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header className="bg-info">
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="1"
                className="text-white w-100 text-left p-0"
              >
                {location.name}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3">
                    {/* <Card.Header>{`Type: ${location.type}`}</Card.Header> */}
                    <div>
                      <b>Type: </b>
                      {location.type}
                    </div>
                    <div>
                      <b>Dimension: </b>
                      {location.type}
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
    </div>
  );
};

export default Locations;
