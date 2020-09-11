import React from "react";
import { Card, Button } from "react-bootstrap";

const CharCard = ({ props }) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <div className="text-left">
          <Card.Text>
            <b>Gender: </b>
            {props.gender}
          </Card.Text>
          <Card.Text>
            <b>Species: </b>
            {props.species}
          </Card.Text>
          <Card.Text>
            <b>Status: </b>
            {props.status}
          </Card.Text>
          <Card.Text>
            <b>Location: </b>
            {props.location.name}
          </Card.Text>
          <Card.Text>
            <b>Origin: </b>
            {props.origin.name}
          </Card.Text>
        </div>
        <Button variant="info" className="mt-3">
          Go somewhere
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CharCard;
