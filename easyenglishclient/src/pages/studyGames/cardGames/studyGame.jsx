import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

import { useWordsStudyStore } from "../../../stores/wordsStudyStore";

import PlayCard from "./playCard";
import FinishCard from "./finishCard";

export default function StudyGame() {
  const [state, actions] = useWordsStudyStore();
  const { words, isGameFinished, wordsStudyResult, cardId, studyGameType } = {
    ...state,
  };

  let translationType;
  let type;
  if (studyGameType === 1) {
    translationType = 1;
    type = 1;
  } else if (studyGameType === 2) {
    translationType = 2;
    type = 1;
  } else if (studyGameType === 3) {
    translationType = 1;
    type = 2;
  }

  useEffect(() => {
    actions.setCardId(cardId);
    actions.loadCardFull(cardId);
  }, []);

  return (
    <>
      {words.length > 0 && (
        <Container>
          {!isGameFinished && (
            <PlayCard type={type} translationType={translationType} />
          )}
          {isGameFinished && (
            <FinishCard
              wordsStudyResult={wordsStudyResult}
              translationType={translationType}
            />
          )}
        </Container>
      )}
    </>
  );
}
