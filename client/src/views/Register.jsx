import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import UserRegistrationForm from '../components/UserRegistrationForm'

const Register = (props) => {

    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const createUser = (userParam => {
        axios.post('http://localhost:8000/api/registerUser', userParam, {withCredentials:true})
            .then((res) => {
                console.log("Success")
                navigate('/main')
            })
            .catch((err)=>{
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
    })

    return (
        <div className="container py-3">
            <h1>Show off your design skills</h1>
            <UserRegistrationForm 
                onSubmitProp = { createUser }
                errors = { errors }
                initialUsername = ""
                initialEmail = ""
                initialPassword = ""
                initialAboutMe = ""
                btnTxt = "Register as a new user"
            />
            <div className="d-flex justify-content-end my-2">
                <Link to={'/'}>Login Page</Link>
            </div>
        </div>
    )
}

export default Register