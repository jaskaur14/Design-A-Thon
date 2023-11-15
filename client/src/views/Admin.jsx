import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdminChallenge from '../components/AdminChallenge'
import AllChallenges from '../components/AllChallenges'

const Admin = (props) => {

    const [challengeArr, setChallengeArr] = useState([])
    const navigate = useNavigate()
    
    const logoutUser = () => {
        axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials:true})
            .then((res) => {
                navigate('/login')
            })
            .catch((err) => {console.log(err)})
    }

    return(
        <div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-light" onClick={ logoutUser }>Logout</button>
            </div>
            <hr />
            <AdminChallenge 
                challengeArr = { challengeArr }
                setChallengeArr = {setChallengeArr }
            />
            <hr />
            <AllChallenges 
                challengeArr = { challengeArr }
                setChallengeArr = {setChallengeArr }
            />
        </div>
    )
}

export default Admin