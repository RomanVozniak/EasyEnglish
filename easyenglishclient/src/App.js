import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./pages/layout/layout";
import TestPage from "./pages/testpage";

import CardsGrid from "./pages/cards/cardsGrid";
import WordsGrid from "./pages/words/wordsGrid";
import FlashCards from "./pages/flashCards/flashCards";
import StudyGame from "./pages/studyGames/cardGames/studyGame";

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/cards" element={<CardsGrid />} />
        <Route path="/words" element={<WordsGrid />} />
        <Route path="/flashCards" element={<FlashCards />} />
        <Route
          path="/studygames/:studyType/:translationType/:cardId"
          element={<StudyGame />}
        />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
