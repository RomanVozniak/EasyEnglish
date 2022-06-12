import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./pages/layout/layout";
import TestPage from "./pages/testpage";

import CardsGrid from "./pages/cardsgrid";

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="cards" element={<CardsGrid />} />
        <Route path="testpage" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
