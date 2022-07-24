import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";

import { useWordsStudyStore } from "./../../stores/wordsStudyStore";
import CardsDropdown from "./../../components/cardsDropdown/cardsDropdown";
import Header from "./components/header/header";

export default function FlashCards() {
  const [state, actions] = useWordsStudyStore();
  const { cards, cardId } = state;

  useEffect(() => {
    actions.loadCards();
  }, []);

  return (
    <>
      <Container>
        <h2>Flash cards</h2>
        <Header />
      </Container>
    </>
  );
}
