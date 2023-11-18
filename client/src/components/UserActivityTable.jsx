import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from "../components/UserDetails"

const UserActivityTable = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        setLoaded(false)
        axios.get("http://localhost:8000/api/users/" + currentUser._id, {withCredentials:true})
            .then((res)=>{
                console.log(res)
                setCurrentUser(res.data)
                setLoaded(true)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [setCurrentUser])

    return(
        <div>
        { loaded && 
            <table className="table table-dark shadow">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Challenge</th>
                        <th>Submission</th>
                        {/* <th>Voted Design</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                { currentUser.submissions ? currentUser.submissions.map((one_subm) => {
                    return(
                    <tr key={ one_subm._id }>
                        <td>{ one_subm.updatedAt.substring(0,10) }</td>
                        <td>{ one_subm.challenge.theme }</td>
                        <td>{ one_subm.name }</td>
                        {/* <td> - </td> */}
                        <td>
                            <Link to={`/designs/${ one_subm._id }`}> View my submission </Link> 
                        </td>
                    </tr>
                    )})
                    : null
                }
                {/* { currentUser.votedDesigns ? currentUser.votedDesigns.map((one_vote) => 
                    <tr key={ one_vote._id }>
                        <td>{ one_vote.updatedAt }</td>
                        <td>{ one_vote.challenge.theme }</td>
                        <td> - </td>
                        <td>{ one_vote.name }</td>
                        <td>
                            <Link to={`/challenges/${ one_vote.challenge }`}> Change my vote </Link> 
                        </td>
                    </tr>
                    )
                    : null
                } */}
                </tbody>
            </table>
        }
        </div>
    )
}

export default UserActivityTable