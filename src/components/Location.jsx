import { locationsAreEqual } from "history";
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
    // await getCharacter(res.length - 2);
    const charArr = [];
    for (let i = 0; i < location?.residents?.length; i++) {
      charArr.push(getCharacter(Number(location?.residents[i]?.slice(42))));
    }
    const resids = [];
    await Promise.all(charArr).then((res) => setResidents(res));
    // setResidents([...resids?.name]);

    // Promise.all(charArr).then((res) => console.log(res));
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

      {/* <div className="h3 text-center m-3">Residents</div> */}
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Residents
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="row">
                {residents?.map((res) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3">
                    <Link to={`/character/${res.id}`}>
                      <div key={res.name} className="mb-2">
                        <b>{res.name}</b>
                      </div>
                      <img
                        src={res.image}
                        alt=""
                        srcset=""
                        className="card-img-top"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Link to={`/`}>
        <Button variant="info" className="mt-3">
          Go home
        </Button>
      </Link>
    </div>
  );
};

export default Location;
