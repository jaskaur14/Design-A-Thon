import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from "./UserDetails"

const Login = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/loginUser', { email, password }, {withCredentials:true})
            .then((res) => {
                console.log(res)
                setCurrentUser(res.data) 
                if (email=="admin@designathon.com") { navigate('/admin') }
                else { navigate('/main') }
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data)
            })
    }

    return(
        <div className="p-4 pe-5 bg-body-tertiary rounded-3 bg-opacity-25 shadow">
            <form onSubmit={ onSubmitHandler }>
                <h1 className="h3 mb-3 fw-normal">Sign in to Design-A-Thon</h1>
                <div className="row mb-3">
                    <ul>
                    { errors.length!=0 ? 
                        <li className="text-danger mx-3">Invalid email/password</li>
                        : null 
                    }
                    </ul>
                    <label htmlFor='email' className="form-label col-sm-2">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" name="email" onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor='password' className="form-label col-sm-2">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" name="password" onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                </div>
                <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-auto">
                    <button className="btn btn-outline-dark btn-lg px-4 me-4" type="submit">Sign In</button>
                    <Link to={'/register'}>Registration Page</Link>
                </div>
            </div>             
            </form>
        </div>
    )
}

export default Login