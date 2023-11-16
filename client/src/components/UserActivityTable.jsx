import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../components/UserDetails"

const UserActivityTable = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext)

    return(
        <div>
            <table className="table table-dark">
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
                        <td>{ one_subm.updatedAt }</td>
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
        </div>
    )
}

export default UserActivityTable