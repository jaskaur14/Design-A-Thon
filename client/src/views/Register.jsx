import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import UserRegistrationForm from '../components/UserRegistrationForm'
import { UserContext } from "../components/UserDetails"

const Register = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const createUser = (userParam => {
        axios.post('http://localhost:8000/api/registerUser', userParam, {withCredentials:true})
            .then((res) => {
                console.log(res)
                setCurrentUser(res.data)
                navigate('/main')
            })
            .catch((err)=>{
                console.log(err)
                setErrors(err.response.data.errors)
            })
    })

    return (
        <div className="p-4 pe-5 bg-body-tertiary rounded-3 bg-opacity-25 shadow">
            <h1 className="mb-5">Show off your design skills</h1>
            <UserRegistrationForm 
                onSubmitProp = { createUser }
                errors = { errors }
                initialUsername = ""
                initialEmail = ""
                initialAboutMe = ""
                btnTxt = "Register as a new user"
                disablePwd = {false}
            />
            <div className="d-flex justify-content-end my-2">
                <button className="btn btn-outline-dark">
                    <Link to={'/login'}>Return to Login Page</Link>
                </button>
            </div>
        </div>
    )
}

export default Register