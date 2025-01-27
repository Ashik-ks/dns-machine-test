import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Form from "./components/Form";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   <>
    <ToastContainer position="top-center" autoClose={2000} />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router></>
  );
}

export default App;
