import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { UserContext } from "../components/UserDetails"

const Header = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate() 
    
    const logoutUser = () => {
        axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials:true})
            .then((res) => {
                setCurrentUser(null)
                navigate('/login')
            })
            .catch((err) => {console.log(err)})
    }
    
    useEffect(()=>{
        if (currentUser==null) { logoutUser() }
        else { setLoaded(true) }
    }, [])

    return(
        <header className="p-3 mb-3 border-bottom">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                <Link to="/main">
                    <i className="bi bi-house-fill" id="home"></i>
                </Link>
                <ul className="nav nav-pills align-items-center">
                    <li className="nav-item px-4">
                    { loaded && 
                        <Link to="/settings">{ currentUser.username }</Link>                    
                    }
                    </li>
                    <li className="btn btn-light nav-item" onClick={ logoutUser }>Logout</li>
                </ul>
            </div>
            <hr/>
            <Outlet />
        </header>
    )
}

export default Header