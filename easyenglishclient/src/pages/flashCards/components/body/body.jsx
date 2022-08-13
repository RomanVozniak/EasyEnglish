import React from "react";

import { useWordsStudyStore } from "../../../../stores/wordsStudyStore";
import StudyGame from "../../../studyGames/cardGames/studyGame";

export default function Body() {
  const [state, actions] = useWordsStudyStore();
  const { studyGameType } = state;

  return (
    <div>
      <div>{studyGameType != null && <StudyGame />}</div>
    </div>
  );
}
