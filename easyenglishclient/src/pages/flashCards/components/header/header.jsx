import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";

import { useWordsStudyStore } from "./../../../../stores/wordsStudyStore";
import CardsDropdown from "./../../../../components/cardsDropdown/cardsDropdown";
import CardStatus from "./../../../../components/cardStatus/cardStatus";

import "./style.scss";

export default function Header() {
  const [state, actions] = useWordsStudyStore();
  const { cards, card, cardStatistic, cardId } = state;

  useEffect(() => {
    actions.loadCards();
    actions.loadCardFull(cardId);
  }, [cardId]);

  return (
    <div className="header">
      <div className="area shadow-sm">
        <b>Колода: </b>
        <CardsDropdown
          cards={cards}
          cardId={cardId}
          onChange={(e) => actions.setCardId(e.target.value)}
        />
      </div>
      <div className="area shadow-sm">
        <CardStatus status={cardStatistic} />
      </div>
      <div className="area shadow-sm">
        <b>Режими навчання: </b>
        <ul className="text-primary">
          <li>
            <a href={"/studyGames/1/1/" + cardId}>Відгадування (Укр - Англ)</a>
          </li>
          <li>
            <a href={"/studyGames/1/2/" + cardId}>Відгадування (Англ - Укр)</a>
          </li>
          <li>
            <a href={"/studyGames/2/" + cardId}>Письмо (Укр - Англ)</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
