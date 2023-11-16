import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from "../components/UserDetails"

const MainDashboard = (props) => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [allChallenges, setAllChallenges] = useState([])
    
    useEffect(() => {
        console.log(currentUser)
        axios
        .get("http://localhost:8000/api/challenges")
        .then((response) => {
            console.log(response.data)
            setAllChallenges(response.data.challenges)
        })
        .catch((err) => {
            console.log(err.response)
        })
    }, [])

    return(
        <div className="main-wrapper">
            <h1>Welcome to Design-A-Thon</h1>
            <h3>The latest challenges are here!</h3>

            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Theme</th>
                            <th scope="col">Date Posted</th>
                            <th scope="col">Submissions</th>
                            <th scope="col">Votes</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allChallenges.map((challenge, index) => {
                            return (
                                <tr key={challenge._id}>
                                    <td>{challenge.theme}</td>
                                    <td>{(Date (challenge.postingDate)).substring(0,15)}</td>
                                    <td>{""}</td>
                                    <td>{""}</td>
                                    <td>{(!challenge.status) ? "Open" : "Closed" }</td>
                                    <td>{(currentUser._id == challenge.user)? (
                                        <span>
                                            <Link to="#">View</Link>
                                        </span>
                                    ) : "Open" }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to={"/admin"}>Add a Challenge</Link>
                <br />
                <Link to={"/designs"}>Submit a Design!</Link>
                <br />
                <Link to={"/alldesigns"}>See All Designs</Link>
            </div>
        </div>

    )
}

export default MainDashboard