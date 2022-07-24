import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./style.css";

export default function CardsDropdown(props) {
  const { cards, cardId, onChange, noValueLabel } = { ...props };

  if (!cards) {
    return <></>;
  }
  return (
    <>
      <Form.Select
        value={cardId ? cardId : ""}
        onChange={onChange}
        className="select-wrapper"
      >
        <option value="">
          {noValueLabel ? noValueLabel : "Open this select menu"}
        </option>
        {cards.map((card) => {
          return (
            <option key={card.id} value={card.id}>
              {card.name}
            </option>
          );
        })}
      </Form.Select>
    </>
  );
}
