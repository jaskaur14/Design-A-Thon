import React, { createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Login from "./components/Login"
import MainDashboard from "./components/MainDashboard"
import Settings from "./views/Settings"
import Register from "./views/Register"
import Form from "./components/SubmissionForm"
import EditSubmission from './components/EditSubmission'
import OneDesign from './components/ViewSubmission'
import { UserProvider } from "./components/UserDetails"
import AdminChallenge from "./components/AdminChallenge"
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
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin" element={<AdminChallenge />} />
                <Route path="/designs" element={<Form />} />
                <Route path="/designs/{id}" element={<EditSubmission />} />
                <Route path="/designs/{id}" element={<OneDesign />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
