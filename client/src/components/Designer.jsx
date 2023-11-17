import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'

const Designer = (props) => {

    const {id} = useParams()
    const [thisDesigner, setThisDesigner] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const fetchDetails = async() => {
            try {
                const oneDesigner = await axios.get(`http://localhost:8000/api/users/${id}`, {withCredentials:true})
                console.log(oneDesigner)
                setThisDesigner(oneDesigner.data)
                setLoaded(true)
            }
            catch (err) { console.log(err) }
        }
        fetchDetails()
    }, [])

    return (

        <>
        { loaded && 
            <div>
                <div>
                    <h1>Designer: { thisDesigner.username } </h1>
                    <p>{ thisDesigner.aboutMe }</p>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    { 
                        thisDesigner.submissions.map((designs) => (
                            <div key={designs._id} className="col">
                                <div className="card shadow-sm">
                                    <Link to={`/designs/${designs._id}`}>
                                        <img src={designs.image} alt="" width="100%" height="225" preserveAspectRatio="xMidYMid slice" className="p-2 card-design"/>
                                        <div className="card-body">
                                            <h2 className="img-title">{designs.name}</h2>
                                            <p className="card-text fst-italic">Submitted for {designs.challenge.theme}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        }
        </>

    )
}

export default Designer