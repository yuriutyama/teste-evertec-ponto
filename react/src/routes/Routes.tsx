import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "../pages/CadastrarPage";
import Editar from "../pages/EditarPage";
import { Home } from "../pages/HomePage";
import Navbar from "../components/Navbar";

export function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/editar/:_id" element={<Editar />} />
      </Routes>
    </Router>
  );
}
