import React, { useEffect, useState } from "react";
import { ListGroup, Accordion, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getCharacter, getLocation } from "rickmortyapi";

const Location = () => {
  const [location, setLocation] = useState({});
  const [residents, setResidents] = useState([]);
  const { id } = useParams();

  const fetchLocation = async () => {
    setLocation(await getLocation(Number(id)));
  };

  const fetchResidents = async () => {
    const charArr = [];
    for (let i = 0; i < location?.residents?.length; i++) {
      charArr.push(getCharacter(Number(location?.residents[i]?.slice(42))));
    }
    const resids = [];
    await Promise.all(charArr).then((res) => setResidents(res));
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location?.residents) fetchResidents();
  }, [location]);

  return (
    <div className="container">
      <div className="display-3 text-center m-5">{location?.name}</div>
      <ListGroup>
        <ListGroup.Item>
          <b>Type: </b> {location?.type}
        </ListGroup.Item>
        <ListGroup.Item>
          <b>Dimension: </b> {location?.dimension}
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
              Residents
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="row">
                {residents?.map((res) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3">
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

export default Location;
