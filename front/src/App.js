import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./styles/app.css";
import { GetAllBookCase } from "./API/API";
function App() {

  const [authPage, setAuthPage] = useState('Auth');
  const [popUp, setPopUp] = useState("");
  const [activePage, setActivePage] = useState("HomePage");
  
  const context = {
    setAuthPage,
    popUp,
    setPopUp,
    authPage,
    activePage,
    setActivePage
  };

  return (
    <DataContext.Provider
    value={context}
    >
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<AuthPage />}></Route>
          <Route path="/HomePage" element={<HomePage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  </DataContext.Provider>
  );
}

export default App;
