import React, { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Login from "./components/Login"
import MainDashboard from "./components/MainDashboard"
import Register from "./views/Register"
import { UserProvider } from "./components/UserDetails"
import './App.css'

function App() {

  return (
    <div className="container mx-5">
      <UserProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element = {<Login />} />
              <Route path="/" element = {<Header />}>
              <Route path="/main" element={<MainDashboard />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
