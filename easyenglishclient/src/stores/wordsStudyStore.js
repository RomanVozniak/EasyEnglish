import { createStore, createHook } from "react-sweet-state";
import { cardsApi, wordsApi, loadCards } from "./../functions/api";

// This is the value of the store on initialisation
const initialState = {
  cardId: null,
  card: null,
  words: [],
  cardStatistic: null,
  cards: [],
  wordsStudyResult: [],
  isGameFinished: false,
};

// All the actions that mutate the store
const actions = {
  loadCards:
    () =>
    ({ setState }) => {
      loadCards((cards) => {
        setState({ cards: cards });
      });
    },
  setCardId:
    (cardId) =>
    ({ setState }) => {
      setState({ cardId: cardId });
    },
  loadCardFull:
    (cardId) =>
    ({ setState }) => {
      const saveData = (card) => {
        setState({ card: card });
        setState({ words: card.words });
        setState({ cardStatistic: card.cardStatistic });
      };
      if (cardId) {
        cardsApi.loadCardFull(cardId, saveData);
      }
    },
  loadWords:
    () =>
    ({ setState }) => {
      wordsApi.loadWords((words) => setState({ words: words }));
    },
  pushWordSutyResult:
    (wordStudyResult) =>
    ({ setState, getState }) => {
      const wordsStudyResult = getState().wordsStudyResult;
      const newWordsStudyResult = [...wordsStudyResult, wordStudyResult];
      setState({ wordsStudyResult: newWordsStudyResult });
    },
  setGameFinished:
    (isGameFinished) =>
    ({ setState }) => {
      setState({ isGameFinished: isGameFinished });
    },
  postWordStudyResult:
    () =>
    ({ getState }) => {
      const wordsStudyResult = getState().wordsStudyResult;
      wordsApi.saveLearnStatistic(wordsStudyResult);
    },
};

export const wordsStudyStore = createStore({
  initialState,
  actions,
  name: "wordsStudyStore",
});

export const useWordsStudyStore = createHook(wordsStudyStore);
