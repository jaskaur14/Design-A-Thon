import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./views/Register"
import Login from "./components/Login"
import MainDashboard from "./components/MainDashboard"
import './App.css'

function App() {

  return (
    <div className="container mx-5">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element = {<Login />} />
          <Route path="/main" element={<MainDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
