import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { wordsApi } from "../../functions/api";
import { useWordsStore } from "./../../stores/wordsStore";

export default function WordForm(props) {
  const [state, actions] = useWordsStore();
  const { cards } = { ...state };

  const [phrase, setPhrase] = useState();
  const [translation, setTranslation] = useState();
  const [description, setDescription] = useState();
  const [cardId, setCardId] = useState(cards.length ? cards[0].id : undefined);
  const isUpdateForm = props.isUpdateForm;

  // set default values
  const wordToEdit = props.word;
  const word = {
    id: wordToEdit ? wordToEdit.id : "",
    phrase: wordToEdit ? wordToEdit.phrase : "",
    translation: wordToEdit ? wordToEdit.translation : "",
    description: wordToEdit ? wordToEdit.description : "",
    cardId: wordToEdit ? wordToEdit.cardId : cardId,
    createdAt: wordToEdit ? wordToEdit.createdAt : "",
  };

  useEffect(() => {
    setPhrase(word.phrase);
    setTranslation(word.translation);
    setDescription(word.description);
    setCardId(word.cardId);
  }, [isUpdateForm]);

  const handleSubmit = () => {
    word.phrase = phrase;
    word.translation = translation;
    word.description = description;
    word.cardId = cardId;

    if (isUpdateForm) {
      wordsApi.updateWord(word);
    } else {
      wordsApi.createWord(word);
      actions.setDisplayCreateForm(true);
    }
  };

  const cancel = (e) => {
    actions.setDisplayCreateForm(false);
    actions.setDisplayUpdateForm(false);
    e.preventDefault();
  };

  return (
    <>
      <hr />
      {/* Title */}
      <h2>{isUpdateForm ? "Edit Word" : "Create Word"}</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col lg="4">
            {/* Phrase */}
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Phrase</b>
              </Form.Label>
              <Form.Control
                required
                type="input"
                defaultValue={phrase}
                onChange={(e) => setPhrase(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col lg="4">
            {/* Card */}
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Card</b>
              </Form.Label>
              <Form.Select
                required
                aria-label="Default select example"
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
              >
                <option value="">Open this select menu</option>
                {cards.map((card) => {
                  return (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg="4">
            {/* Translation */}
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Translation</b>
              </Form.Label>
              <Form.Control
                required
                type="input"
                defaultValue={translation}
                onChange={(e) => setTranslation(e.target.value)}
              />
            </Form.Group>
            {/* Save */}
            <Button variant="dark" type="submit">
              Save
            </Button>

            <Button variant="dark" type="submit" onClick={cancel}>
              Cancel
            </Button>
          </Col>
          <Col lg="4">
            {" "}
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
          </Col>
        </Row>
      </Form>
      <hr />
    </>
  );
}
