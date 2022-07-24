import { createStore, createHook } from "react-sweet-state";
import { loadCards } from "./../functions/api";

// This is the value of the store on initialisation
const initialState = {
  cards: [],
  displayCreateForm: false,
  displayUpdateForm: false,
  cardToUpdate: null,
};

// All the actions that mutate the store
const actions = {
  setDisplayCreateForm:
    (value) =>
    ({ setState }) =>
      setState({ displayCreateForm: value }),

  setDisplayUpdateForm:
    (value) =>
    ({ setState }) =>
      setState({ displayUpdateForm: value }),

  setCardToUpdate:
    (value) =>
    ({ setState }) =>
      setState({ cardToUpdate: value }),

  loadCards:
    () =>
    ({ setState }) => {
      loadCards((cards) => setState({ cards: cards }));
    },
};

export const cardStore = createStore({
  initialState,
  actions,
  name: "cardStore",
});

export const useCardStore = createHook(cardStore);
