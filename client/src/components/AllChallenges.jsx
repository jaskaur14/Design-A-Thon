import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AllChallenges = (props) => {

    const {challengeArr, setChallengeArr} = props
    const [thisChallenge, setThisChallenge] = useState("")
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        setLoaded(false)
        axios.get("http://localhost:8000/api/challenges/")
            .then((res)=>{
                setChallengeArr(res.data.challenges)
                setLoaded(true)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [thisChallenge, setChallengeArr])

    const deleteChallenge = (challengeId) => {
        if (confirm('Click ok to permanently remove this challenge')) {
            axios.delete('http://localhost:8000/api/challenges/' + challengeId)
                .then((res)=> {
                    console.log(res.data)
                    setChallengeArr(challengeArr => {
                        challengeArr.filter(challenge => challenge._id != challengeId)
                    })
                    setLoaded(false)
                })
                .catch(err => console.log(err))
        }
    }

    const updateStatus = (challengeId, challengeStatus) => {
        axios.patch('http://localhost:8000/api/challenges/' + challengeId, {status: !challengeStatus}, {withCredentials:true})
            .then((res) => {
                console.log(res)
                setThisChallenge(res.data.challenge)
                setLoaded(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <div>
            <h3 id="challenge-table" className="mb-3">All Challenges</h3>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Theme</th>
                        <th>Posting Date</th>
                        <th>Submissions</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                { challengeArr ? 
                    loaded && challengeArr.map((one_challenge) => 
                    <tr key={ one_challenge._id }>
                        <td>{ one_challenge.theme }</td>
                        <td>{ one_challenge.postingDate.substring(0,10) }</td>
                        <td>{ one_challenge.submissions.length }</td>
                        <td>{ one_challenge.status ? "Open": "Closed" }</td>
                        <td>
                            <button className="btn btn-secondary btn-sm mx-2" onClick={(e)=>{updateStatus(one_challenge._id, one_challenge.status)}}> Toggle Status </button> 
                            <Link to={`/admin/${ one_challenge._id }`}>
                                <i className="bi bi-pencil-square text-light mx-2" />
                            </Link>
                            <i className="bi bi-trash3-fill delete" onClick={(e)=>{deleteChallenge(one_challenge._id)}} />
                        </td>
                    </tr>
                    )
                    : <tr><td>No challenges found</td></tr>
                }
                </tbody>
            </table>
        </div>
    )
}

export default AllChallenges