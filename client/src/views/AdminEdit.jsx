import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdminChallenge from '../components/AdminChallenge'

const Admin = (props) => {

    const [challengeArr, setChallengeArr] = useState([])
    const [thisChallenge, setThisChallenge] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [status, setStatus] = useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/challenges/")
            .then((res)=>{
                console.log(res)
                setChallengeArr(res.challenges.challenges)
                setLoaded(true)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [setThisChallenge])

    const deleteChallenge = (challengeId) => {
        if (confirm('Click ok to permanently remove this challenge')) {
            axios.delete('http://localhost:8000/api/challenge/' + challengeId)
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

    const updateStatus = (challengeId) => {
        axios.patch('http://localhost:8000/api/challenge/' + challengeId, {status}, {withCredentials:true})
            .then((res) => {
                console.log(res)
                setThisChallenge(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return(
        <div>
            <AdminChallenge />
            <hr />
            <h3>All Challenges</h3>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Theme</th>
                        <th>Posting Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                { loaded && challengeArr ? 
                    challengeArr.map((one_challenge) => 
                    <tr key={ one_challenge._id }>
                        <td>{ one_challenge.theme }</td>
                        <td>{ one_challenge.postingDate }</td>
                        <td>{ one_challenge.status }</td>
                        <td>
                            <Link to={`/admin/${ one_challenge._id }`}>
                                <button className="btn btn-secondary btn-sm"> Edit </button> 
                            </Link>
                            <button className="btn btn-secondary btn-sm" onClick={(e)=>{setStatus(!one_challenge.status)}}> Toggle Status </button> 
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

export default Admin