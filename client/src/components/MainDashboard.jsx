import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MainDashboard = (props) => {

    const navigate = useNavigate() 
    
    return(
        <div>
            <h1>Welcome to Design-A-Thon</h1>
        </div>
    )
}

export default MainDashboard