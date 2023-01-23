import { createStore, createHook } from "react-sweet-state";
import { wordsApi, loadCards } from "./../functions/api";

// This is the value of the store on initialisation
const initialState = {
  words: [],
  displayCreateForm: false,
  displayUpdateForm: false,
  wordToUpdate: null,
  cards: [],
  cardId: null,
  compactView: false,
  refreshPage: 0,
};

// All the actions that mutate the store
const actions = {
  setDisplayCreateForm:
    (value) =>
    ({ setState }) => {
      setState({ displayCreateForm: value });
    },
  setDisplayUpdateForm:
    (value) =>
    ({ setState }) =>
      setState({ displayUpdateForm: value }),

  setWordToUpdate:
    (value) =>
    ({ setState }) =>
      setState({ wordToUpdate: value }),

  loadWords:
    (filter) =>
    ({ setState }) => {
      wordsApi.loadWords((words) => setState({ words: words }), filter);
    },

  loadCards:
    () =>
    ({ setState }) => {
      loadCards((cards) => setState({ cards: cards, cardId: cards[0].id }));
    },

  setCardId:
    (value) =>
    ({ setState }) => {
      setState({ cardId: value });
    },

  setRefreshPage:
    () =>
    ({ setState, getState }) => {
      setState({ refreshPage: getState().refreshPage + 1 });
    },
};

export const wordsStore = createStore({
  initialState,
  actions,
  name: "wordsStore",
});

export const useWordsStore = createHook(wordsStore);
