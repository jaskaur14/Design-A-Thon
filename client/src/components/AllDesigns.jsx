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
            <div className="designs-wrapper">
                <div>
                    <h1>Theme: { thisChallenge.theme } </h1>
                    <h3 className="designs-h1">Look at all the Designs!</h3>
                </div>
                { 
                    designs.filter(oneDesign => oneDesign.challenge == id).map((filteredDesigns) => (
                        <div key={filteredDesigns._id}>
                            <Link to={`/designs/${filteredDesigns._id}`}>
                                <h2 className="img-title">{filteredDesigns.name}</h2>
                                <img src={filteredDesigns.image} alt="" />
                            </Link>
                        </div>
                    ))
                }
            </div>
        }
        </>
    )
}

export default AllDesigns