import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import './index.css'
import App from './App.jsx'
import MatchPage from './match/MatchPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={"empty"} />
          <Route path="match" element={<MatchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
