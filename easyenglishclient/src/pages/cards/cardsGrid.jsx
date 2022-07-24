import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useCardStore } from "./../../stores/cardStore";
import CardsTable from "./cardsTable";
import CardForm from "./cardForm";

export default function CardsGrid() {
  const [state, actions] = useCardStore();
  const { cards, displayCreateForm, displayUpdateForm, cardToUpdate } = {
    ...state,
  };

  useEffect(() => {
    actions.loadCards();
  }, []);

  return (
    <Container>
      {displayCreateForm && <CardForm isUpdateCardForm={false} />}
      {!displayCreateForm && !displayUpdateForm && (
        <Button
          variant="dark"
          type="submit"
          onClick={() => actions.setDisplayCreateForm(true)}
        >
          Create card
        </Button>
      )}
      {displayUpdateForm && (
        <CardForm isUpdateCardForm={true} card={cardToUpdate} />
      )}
      <CardsTable cards={cards} />
    </Container>
  );
}
