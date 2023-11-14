import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../components/UserDetails"

const MainDashboard = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext)

    return(
        <div>
            <h1>Welcome to Design-A-Thon</h1>
        </div>
    )
}

export default MainDashboard