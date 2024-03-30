import React from 'react';
import './App.css';
import Home from './Home';
import View from './View';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from './AddUser';
import Update from './Update';



function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/view/:id" element={<View />} />
        <Route exact path="/add-user" element={<AddUser />} />
        {/* <Route exact path="/update/:id" element={<Update />} /> */}
      </Routes>
    </>
  )
}

export default App;
