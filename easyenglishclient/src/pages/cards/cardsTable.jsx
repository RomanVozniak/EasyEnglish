import React, { useState, useEffect } from "react";
import { Table, Button, ProgressBar, Row } from "react-bootstrap";

import { useCardStore } from "./../../stores/cardStore";
import { deleteCard } from "./../../functions/api";
import CardStatus from "./../../components/cardStatus/cardStatus";

export default function CardsTable(props) {
  const [state, actions] = useCardStore();
  const cards = props.cards;

  const ActionButtons = (props) => {
    const card = props.card;
    const editClick = () => {
      actions.setCardToUpdate(card);
      actions.setDisplayUpdateForm(true);
    };
    const deleteClick = () => {
      deleteCard(card.id);
      window.location.reload();
    };

    return (
      <>
        <Button variant="light" type="submit" onClick={editClick}>
          Edit
        </Button>
        <Button variant="light" type="submit" onClick={deleteClick}>
          Delete
        </Button>
      </>
    );
  };

  return (
    <>
      <Table bordered hover>
        <thead>
          <tr>
            <th width="3%">Id</th>
            <th width="30%">Name</th>
            <th width="30%">Description</th>
            <th width="5%">Words</th>
            <th width="15%">Status</th>
            <th width="15%">Action</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => {
            const statistic = card.cardStatistic;
            return (
              <tr key={card.id}>
                <td>{cards.length - index}</td>
                <td>{card.name}</td>
                <td>{card.description}</td>
                <td>{card.wordsCount}</td>
                <td>
                  {statistic && (
                    <CardStatus status={statistic} minView={true} />
                  )}
                </td>
                <td>
                  <ActionButtons card={card} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
