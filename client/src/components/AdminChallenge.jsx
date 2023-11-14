import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminChallenge = (props) => {

    const {challengeArr, setChallengeArr} = props

    const [theme, setTheme] = useState("")
    const [postingDate, setPostingDate] = useState("")
    const [status, setStatus] = useState(false)
    const [errors, setErrors] = useState("")
    
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/challenges", {
            theme,
            postingDate,
            status
        },{withCredentials: true})
        .then((res) => {
            console.log(res)
            console.log(res.data)

            setTheme("")
            setPostingDate("")
            setChallengeArr([...challengeArr, res.data.challenge])
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div className="wrapper1">
            <h1>Challenge Settings</h1>

            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="theme">Theme</label>
                    <input
                        onChange={(e) => setTheme(e.target.value)}
                        value={theme}
                        id="theme"
                        className="form-control"
                        type="text"
                    />
                    {errors.theme ? <p>{errors.theme.message}</p> : null}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="postingDate">Date Posted</label>
                    <input
                        onChange={(e) => setPostingDate(e.target.value)}
                        value={postingDate}
                        id="postingDate"
                        className="form-control"
                        type="date"
                    />
                    {errors.postingDate ? <p>{errors.postingDate.message}</p> : null}
                </div>
                <br />
                <button className="btn btn-outline-primary" type="submit">
                  SUBMIT
                </button>
            </form>
        </div>
    )
}

export default AdminChallenge