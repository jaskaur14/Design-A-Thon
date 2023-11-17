import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'
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

            <h1 style={{fontFamily: 'cursive'}}>Welcome to Design-A-Thon</h1>
            <h3 style={{fontFamily: 'cursive'}}>Check out the latest challenges!</h3>

            <div>
                <table className="table table-light table-hover mt-3 shadow">
                    <thead>
                        <tr>
                            <th scope="col">Theme</th>
                            <th scope="col">Date Posted</th>
                            {/* <th scope="col">Submissions</th> */}
                            {/* <th scope="col">Votes</th> */}
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {allChallenges.filter(oneChallenge => (new Date(oneChallenge.postingDate) <= new Date())).map((challenge) => {
                            return (
                                <tr key={challenge._id}>
                                    <td>{challenge.theme}</td>
                                    <td>{ challenge.postingDate.substring(0,10) }</td>
                                    {/* <td>{challenge.submissions.length}</td> */}
                                    {/* <td>{""}</td> */}
                                    <td>{(challenge.status) ? "Open" : "Closed" }</td>
                                    <td>
                                    {(challenge.status) ? 
                                        <Link to={`/challenges/${ challenge._id }/new`} className="mx-3"> Submit </Link>
                                        : null 
                                    }
                                        <Link to={`/challenges/${ challenge._id }`}> View submissions</Link>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MainDashboard