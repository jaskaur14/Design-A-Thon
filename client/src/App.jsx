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
import Admin from "./views/Admin"
import AdminEdit from "./views/AdminEdit"
import AllDesigns from './components/AllDesigns'
import './App.css'

function App() {

  const [challengeArr, setChallengeArr] = useState([])

  return (
    <div className="container mx-5">
      <UserProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element = {<Login />} />
              <Route path="/admin" element={<Admin 
                challengeArr = { challengeArr }
                setChallengeArr = { setChallengeArr }
              />} />
              <Route path="/admin/:id" element={<AdminEdit 
                challengeArr = { challengeArr }
                setChallengeArr = { setChallengeArr }              
              />} />
              <Route path="/" element = {<Header />}>
                <Route path="/main" element={<MainDashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/alldesigns" element={<AllDesigns />} /> 
                <Route path="/challenges/:id/new" element={<Form />} />
                {/* <Route path="/designs/:id" element={<EditSubmission />} /> */}
                <Route path="/designs/:id" element={<OneDesign />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
