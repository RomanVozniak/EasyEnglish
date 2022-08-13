import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useWordsStudyStore } from "./../../stores/wordsStudyStore";
import Header from "./components/header/header";
import Body from "./components/body/body";

export default function FlashCards() {
  const [state, actions] = useWordsStudyStore();

  useEffect(() => {
    actions.loadCards();
  }, []);

  return (
    <>
      <Container>
        <h2>Flash cards</h2>
        <Row>
          <Col md="4">
            <Header />
          </Col>
          <Col>
            <Body />
          </Col>
        </Row>
      </Container>
    </>
  );
}
