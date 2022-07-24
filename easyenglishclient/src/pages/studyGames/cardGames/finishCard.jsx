import React, { useState, useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useWordsStudyStore } from "../../../stores/wordsStudyStore";

import CardWrapper from "../../../components/cardWrapper/cardWrapper";

export default function FinishCard() {
  const [state, actions] = useWordsStudyStore();
  const { wordsStudyResult } = { ...state };

  const successCount = wordsStudyResult.filter(
    (word) => word.isSuccessful
  ).length;
  const totalCount = wordsStudyResult.length;

  const onFinish = () => {
    actions.postWordStudyResult();
    window.open("/flashCards", "_self");
  };

  return (
    <>
      <CardWrapper
        title="Finish"
        text={`${successCount} of ${totalCount} learned successfully`}
        footer={
          <Row>
            <Button variant="success" onClick={onFinish}>
              Finish
            </Button>
          </Row>
        }
        type="success"
      />
    </>
  );
}
