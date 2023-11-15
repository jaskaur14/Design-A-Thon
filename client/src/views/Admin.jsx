import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdminChallenge from '../components/AdminChallenge'
import AllChallenges from '../components/AllChallenges'

const Admin = (props) => {

    const {challengeArr, setChallengeArr} = props
    const [errors, setErrors] = useState("")
    const navigate = useNavigate()

    const createChallenge = (challengeParam) => {
        console.log(challengeParam)
        axios.post("http://localhost:8000/api/challenges", challengeParam, {withCredentials: true})
        .then((res) => {
            console.log(res)
            setChallengeArr([...challengeArr, res.data.challenge])
        })
        .catch((err) => {
            console.log(err)
            setErrors(err)
        })
    }
    
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
                onSubmitProp = { createChallenge }
                errors = { errors }
                initialTheme = ""
                initialPostingDate = ""
                btnTxt = "Add New Challenge"
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