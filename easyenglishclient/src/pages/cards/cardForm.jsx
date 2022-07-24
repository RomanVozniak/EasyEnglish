import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { updateCard, createCard } from "./../../functions/api";

export default function CardForm(props) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const isUpdateCardForm = props.isUpdateCardForm;

  // set default values
  const cardToEdit = props.card;
  const card = {
    id: cardToEdit ? cardToEdit.id : "",
    name: cardToEdit ? cardToEdit.name : "",
    description: cardToEdit ? cardToEdit.description : "",
    createdAt: cardToEdit ? cardToEdit.createdAt : "",
  };

  useEffect(() => {
    setName(card.name);
    setDescription(card.description);
  }, [isUpdateCardForm]);

  const handleSubmit = () => {
    card.name = name;
    card.description = description;

    if (isUpdateCardForm) {
      updateCard(card);
    } else {
      createCard(card);
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col lg="4">
          <hr />
          {/* Title */}
          <h2>{isUpdateCardForm ? "Edit Card" : "Create Card"}</h2>
          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Name</b>
              </Form.Label>
              <Form.Control
                required
                type="input"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            {/* Save */}
            <Button variant="dark" type="submit">
              Save
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </>
  );
}
