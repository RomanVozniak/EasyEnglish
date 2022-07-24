import React, { useState, useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useWordsStudyStore } from "../../../stores/wordsStudyStore";

import PlayCard from "./playCard";
import FinishCard from "./finishCard";

export default function StudyGame() {
  const [state, actions] = useWordsStudyStore();
  const { words, isGameFinished, wordsStudyResult } = {
    ...state,
  };
  const { cardId, studyType, translationType } = useParams();

  useEffect(() => {
    actions.setCardId(cardId);
    actions.loadCardFull(cardId);
  }, []);

  return (
    <>
      {words.length > 0 && (
        <Container>
          {!isGameFinished && (
            <PlayCard type={studyType} translationType={translationType} />
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
