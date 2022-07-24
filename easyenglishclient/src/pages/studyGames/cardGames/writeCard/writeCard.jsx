import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Row, Form } from "react-bootstrap";

import CardWrapper from "../../../../components/cardWrapper/cardWrapper";
import { say } from "./../../../../functions/functions";

function compare(inputValue, value) {
  return inputValue.toLowerCase().trim() == value.toLowerCase().trim();
}

const checkStateValues = {
  input: 0,
  overview: 1,
  next: 2,
};

export default function WriteCard(props) {
  const [checkState, setCheckState] = useState(checkStateValues.input);
  const [inputValue, setInputValue] = useState("");
  const word = props.word;

  const success = compare(inputValue, word.phrase);
  if (checkState) {
    if (checkState === checkStateValues.next) {
      props.submitResult(success);
      setCheckState(checkStateValues.input);
      setInputValue("");
    }
  }

  const InputComponent = (props) => {
    const [value, setValue] = useState(props.value);
    return (
      <>
        <Form.Group>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={() => {
              setInputValue(value);
              setCheckState(checkState + 1);
            }}
          >
            Check
          </Button>
        </Form.Group>
      </>
    );
  };

  const title = word.translation;
  const text = checkState == checkStateValues.input ? "" : word.phrase;

  return (
    <CardWrapper
      progress={0}
      title={title}
      text={
        <>
          {checkState === checkStateValues.overview && (
            <>
              <span className={success ? "text-success" : "text-danger"}>
                <h4 onClick={() => say(text)}>{text}</h4>
              </span>
            </>
          )}

          <InputComponent value={inputValue} />
        </>
      }
      type="secondary"
    />
  );
}
