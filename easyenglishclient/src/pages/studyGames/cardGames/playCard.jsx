import React from "react";

import { useWordsStudyStore } from "../../../stores/wordsStudyStore";
import GuessCard from "./guessCard/guessGard";
import WriteCard from "./writeCard/writeCard";

export default function PlayCard(props) {
  const [state, actions] = useWordsStudyStore();
  const { words, wordsStudyResult } = { ...state };
  const type = props.type;
  const translationType = props.translationType;

  const wordsToStudy = shuffle(getNotStudiedWords(words, wordsStudyResult));
  const studyWord = wordsToStudy[0];
  const progress = (100 * wordsStudyResult.length) / words.length;

  const submitResult = (success) => {
    const studyResult = {
      wordId: studyWord.id,
      isSuccessful: success,
      type: parseInt(type),
    };
    actions.pushWordSutyResult(studyResult);
    actions.setGameFinished(checkLastWord(wordsToStudy));
  };

  return (
    <>
      {type == 1 && (
        <GuessCard
          word={studyWord}
          submitResult={submitResult}
          translationType={translationType}
          progress={progress}
        />
      )}
      {type == 2 && (
        <WriteCard
          word={studyWord}
          submitResult={submitResult}
          translationType={translationType}
          progress={progress}
        />
      )}
    </>
  );
}

function getNotStudiedWords(words, wordsStudyResult) {
  return words.filter((word) => {
    const isStudied = !!wordsStudyResult.find(
      (wordStudied) => wordStudied.wordId === word.id
    );
    return !isStudied;
  });
}
function checkLastWord(studyWord) {
  return studyWord.length === 1;
}
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
