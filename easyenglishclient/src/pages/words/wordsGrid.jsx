import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import WordsTable from "./wordsTable";
import WordForm from "./wordForm";
import CardsDropdown from "./../../components/cardsDropdown/cardsDropdown";

import { useWordsStore } from "./../../stores/wordsStore";

export default function WordsGrid(props) {
  const [state, actions] = useWordsStore();
  const {
    words,
    cards,
    cardId,
    displayCreateForm,
    displayUpdateForm,
    wordToUpdate,
  } = {
    ...state,
  };

  useEffect(() => {
    actions.loadCards();
  }, []);

  useEffect(() => {
    if (cardId) {
      actions.loadWords({ cardId: cardId });
    } else {
      actions.loadWords();
    }
  }, [cardId]);

  const CudComponent = () => {
    // cud - create, update, delete
    if (displayCreateForm && !displayUpdateForm) {
      return <WordForm />;
    } else if (displayUpdateForm && !displayCreateForm) {
      return <WordForm isUpdateForm={true} word={wordToUpdate} />;
    } else if (!displayCreateForm && !displayUpdateForm) {
      return (
        <Button
          variant="dark"
          type="submit"
          onClick={() => {
            actions.setDisplayCreateForm(true);
          }}
        >
          Add word
        </Button>
      );
    }
  };

  return (
    <Container>
      <CardsDropdown
        noValueLabel=" - All words - "
        cards={cards}
        cardId={cardId}
        onChange={(e) => actions.setCardId(e.target.value)}
      />
      <CudComponent />
      <WordsTable words={words} cards={cards} />
    </Container>
  );
}
