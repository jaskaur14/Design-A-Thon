import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const AllDesigns = (props) => {
    const [designs, setDesigns] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/alldesigns')
        .then((res) => {
            console.log(res)
            setDesigns(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="design-wrapper">
            <h1 style={{fontFamily: 'cursive'}}>Look at all the Designs!</h1>
            {
                designs.map((designs) => (
                    <div key={designs._id}>
                        <Link to={`/designs/${designs._id}`}>
                            <h2 className="img-title">{designs.name}</h2>
                            <img className="main-imgs" src={designs.image} alt="default image" />
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
export default AllDesigns