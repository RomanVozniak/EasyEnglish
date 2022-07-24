import React from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import "./style.scss";

const say = function (text) {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[2];
  msg.volume = 1;
  msg.rate = 0.6; // speed
  msg.pitch = 0.8;
  msg.text = text;
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
};

export default function Play(props) {
  const text = props.text;
  return (
    <>
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => say(text)}
        className="play"
      >
        Play
      </Button>
    </>
  );
}
