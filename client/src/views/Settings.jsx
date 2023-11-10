import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import UserRegistrationForm from '../components/UserRegistrationForm'
import { UserContext } from "../components/UserDetails"

const Settings = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    const updateUser = (userParam) => {
        axios.patch('http://localhost:8000/api/users/' + currentUser._id, userParam, {withCredentials:true})
            .then((res) => {
                console.log(res)
                setCurrentUser(res.data)
                navigate("/main")
            })
            .catch((err) => {
                console.log(err.response)
                setErrors(err.response.data)
            })
    }

    return (
        <div className="container py-3">
            <h3 className="d-flex justify-self-start mb-3">My Profile</h3>
            { loaded && 
                <UserRegistrationForm 
                    onSubmitProp = { updateUser }
                    errors = { errors }
                    initialUsername = { currentUser.username }
                    initialEmail = { currentUser.email }
                    initialAboutMe = { currentUser.aboutMe }
                    btnTxt = "Update my profile"
                />
            }
        </div>
    )
}

export default Settings