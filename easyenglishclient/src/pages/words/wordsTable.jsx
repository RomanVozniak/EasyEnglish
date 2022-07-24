import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

import { useWordsStore } from "./../../stores/wordsStore";
import { wordsApi } from "./../../functions/api";
import Play from "./../../components/play/play";

export default function CardsTable(props) {
  const [state, actions] = useWordsStore();
  const words = props.words;
  const cards = props.cards;

  const [isCompactView, setCompactView] = useState(false);

  const ActionButtons = (props) => {
    const word = props.word;
    const editClick = () => {
      actions.setWordToUpdate(word);
      actions.setDisplayUpdateForm(true);
    };
    const deleteClick = () => {
      wordsApi.deleteWord(word.id);
      window.location.reload();
    };

    return (
      <>
        <Button variant="light" type="submit" onClick={editClick}>
          Edit
        </Button>
        <Button variant="light" type="submit" onClick={deleteClick}>
          Delete
        </Button>
      </>
    );
  };

  let i = 1;

  return (
    <>
      <Form.Check
        type="checkbox"
        label="Compact view"
        checked={isCompactView}
        onChange={() => setCompactView(!isCompactView)}
      />
      <Table bordered hover>
        <thead>
          <tr>
            <th width="2%">Id</th>
            <th width="25%">Phrase</th>
            <th width="25%">Translation</th>
            <th width="25%">Description</th>
            {!isCompactView && (
              <>
                <th width="10%">Card</th>
                <th width="15%">Action</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {words.map((word) => {
            const card = cards.find((card) => card.id == word.cardId);
            const cardName = card ? card.name : "";

            return (
              <tr key={word.id}>
                <td title={word.id}>{i++}</td>
                <td>
                  <Play text={word.phrase} /> {word.phrase}
                </td>
                <td>{word.translation}</td>
                <td>{word.description}</td>
                {!isCompactView && (
                  <>
                    <td>{cardName}</td>
                    <td>
                      <ActionButtons word={word} />
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
