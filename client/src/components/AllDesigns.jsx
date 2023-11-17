import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'

const AllDesigns = (props) => {

    const {id} = useParams()
    const [designs, setDesigns] = useState([])
    const [thisChallenge, setThisChallenge] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const fetchDetails = async() => {
            try {
                const allDesigns = await axios.get('http://localhost:8000/api/alldesigns')
                const challengeData = await axios.get(`http://localhost:8000/api/challenges/${id}`)
                console.log(allDesigns)
                console.log(challengeData)
                setDesigns(allDesigns.data)
                setThisChallenge(challengeData.data.challenge)
                setLoaded(true)
            }
            catch (err) { console.log(err) }
        }
        fetchDetails()
    }, [])

    return (

        <>
        { loaded && 
            <div className="design-wrapper">
                <div>
                    <h1>Theme: { thisChallenge.theme } </h1>
                    <h3 style={{fontFamily: 'cursive'}} className="designs-h1">Look at all the Designs!</h3>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    { 
                        designs.filter(oneDesign => oneDesign.challenge == id).map((filteredDesigns) => (
                            <div key={filteredDesigns._id} className="col">
                                <div className="card shadow-sm">
                                    <Link to={`/designs/${filteredDesigns._id}`}>
                                        <img src={filteredDesigns.image} alt="" width="100%" height="225" preserveAspectRatio="xMidYMid slice" className="p-2 card-design"/>
                                        <div className="card-body">
                                            <h2 className="img-title">{filteredDesigns.name}</h2>
                                            <p className="card-text fst-italic">Submitted by {filteredDesigns.designer.username}</p>
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

export default AllDesigns