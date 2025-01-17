import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";

import './index.css';
import App from './App';
import ErrorBoundary from './util/ErrorBoundary';
import Loading from './common/component/Loading';

const StreamPage = lazy(() => import('./stream/StreamPage'));

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<App />}>
            <Route path="stream">
              <Route path=":roomName" element={<StreamPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  </BrowserRouter>
);
