import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./styles/app.css";
import { GetAllBookCase } from "./API/API";
import CatalogModule from "./modules/CatalogModule/CatalogModule";
import ZacazModule from "./modules/ZacazModule/ZacazModule";
import HomePageModule from "./modules/HomePageModule/HomePageModule";
import HistoryModule from "./modules/HistoryModule/HistoryModule";
import UsersModule from "./modules/UsersModule/UsersModule";
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
          <Route path="/HomePage/*" element={<HomePage />}>
            <Route path="Home" element={<HomePageModule />} />
            <Route path="Catalog" element={<CatalogModule />} />
            <Route path="Basket" element={<ZacazModule />}  />
            <Route path="History" element={<HistoryModule />} />
            <Route path="Users" element={<UsersModule />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  </DataContext.Provider>
  );
}

export default App;
