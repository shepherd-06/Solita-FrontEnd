import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JourneyView from './pages/journey';
import Layout from './pages/layout';
import StationListView from './pages/station_list';
import SingleStationView from './pages/single_station';
import ErrorPage from './pages/no_page';

const root = ReactDOM.createRoot(document.getElementById('root'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Solita-FrontEnd" element={<Layout />}>
          <Route index element={<JourneyView />} />
          <Route path="single_station" element={<SingleStationView />} />
          <Route path="station" element={<StationListView />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
