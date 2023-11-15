import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AdminChallenge from '../components/AdminChallenge'
import AllChallenges from '../components/AllChallenges'

const AdminEdit = (props) => {

    const {challengeArr, setChallengeArr} = props
    let {id} = useParams()
    const [thisChallenge, setThisChallenge] = useState({})
    const [errors, setErrors] = useState([])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()  

    useEffect(() => {
        setLoaded(false)
        axios.get("http://localhost:8000/api/challenges/" + id, {withCredentials:true})
        .then((res)=>{
            setThisChallenge(res.data.challenge)
            setLoaded(true)
        })
        .catch((err)=>{
            console.log(err);
        })    
    }, [id])

    const logoutUser = () => {
        axios.post('http://localhost:8000/api/logoutUser', {}, {withCredentials:true})
            .then((res) => {
                navigate('/login')
            })
            .catch((err) => {console.log(err)})
    }

    const updateChallenge = (challengeParam) => {
        axios.patch('http://localhost:8000/api/challenges/' + id, challengeParam, {withCredentials:true})
            .then((res) => {
                console.log(res)
                setThisChallenge(res.data)
                navigate("/admin")
            })
            .catch((err) => {
                console.log(err)
                setErrors(err)
            })
    }

    return(
        <div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-light" onClick={ logoutUser }>Logout</button>
            </div>
            <hr />
            { loaded && 
                <AdminChallenge 
                    onSubmitProp = { updateChallenge }
                    errors = { errors }
                    initialTheme = { thisChallenge.theme }
                    initialPostingDate = { thisChallenge.postingDate.substring(0,10) }
                    btnTxt = "Update Challenge"
                />
            }
            <hr />
            <AllChallenges 
                challengeArr = { challengeArr }
                setChallengeArr = { setChallengeArr }
            />
        </div>
    )
}

export default AdminEdit