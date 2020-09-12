import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { saveCurrentPage } from "../app/countSlice";

const CharCard = ({ props }) => {
  const { id } = useParams();

  const handleClick = () => {
    console.log(id);
  };
  useEffect(() => {}, []);

  return (
    <Card style={{ maxWidth: "300px" }}>
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
        <Link onClick={() => handleClick()} to={`/character/${props.id}`}>
          <Button variant="info" className="mt-3">
            More Info
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CharCard;
