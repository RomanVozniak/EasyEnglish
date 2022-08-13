import React, { useEffect } from "react";

import { useWordsStudyStore } from "./../../../../stores/wordsStudyStore";
import CardsDropdown from "./../../../../components/cardsDropdown/cardsDropdown";
import CardStatus from "./../../../../components/cardStatus/cardStatus";

import "./style.scss";

export default function Header() {
  const [state, actions] = useWordsStudyStore();
  const { cards, cardStatistic, cardId } = state;

  useEffect(() => {
    actions.loadCardsAndSetCardId();
  }, []);

  useEffect(() => {
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
          <li onClick={() => actions.setStudyGameType(1)}>
            Відгадування (Укр - Англ)
          </li>
          <li onClick={() => actions.setStudyGameType(2)}>
            Відгадування (Англ - Укр)
          </li>
          <li onClick={() => actions.setStudyGameType(3)}>
            Письмо (Укр - Англ)
          </li>
        </ul>
      </div>
    </div>
  );
}
