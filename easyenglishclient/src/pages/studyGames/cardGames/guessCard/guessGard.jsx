import React, { useState, useEffect } from "react";
import { Button, Row } from "react-bootstrap";

import CardWrapper from "../../../../components/cardWrapper/cardWrapper";

const translationTypes = {
  ukToEng: 1,
  engToUk: 2,
};

export default function GuessCard(props) {
  const [checkState, setCheckState] = useState(false);
  const word = props.word;
  const { translationType, progress } = { ...props };

  let title;
  let text;
  if (translationType == translationTypes.ukToEng) {
    title = checkState ? word.phrase : word.translation;
    text = !checkState ? "" : word.translation;
  } else {
    title = checkState ? word.translation : word.phrase;
    text = !checkState ? "" : word.phrase;
  }

  const ButtonsFooter = (props) => {
    const check = () => {
      setCheckState(true);
    };
    const submitResult = (success) => {
      setCheckState(false);
      props.submitResult(success);
    };

    if (!checkState) {
      return (
        <Row>
          <Button variant="light" onClick={check}>
            Check
          </Button>
        </Row>
      );
    } else {
      return (
        <Row>
          <Button
            variant="danger"
            onClick={() => submitResult(false)}
            style={{ width: "50%" }}
          >
            Fail
          </Button>
          <Button
            variant="success"
            onClick={() => submitResult(true)}
            style={{ width: "50%" }}
          >
            Success
          </Button>
        </Row>
      );
    }
  };

  return (
    <CardWrapper
      progress={progress}
      title={title}
      text={text}
      footer={<ButtonsFooter submitResult={props.submitResult} />}
      type="secondary"
    />
  );
}
