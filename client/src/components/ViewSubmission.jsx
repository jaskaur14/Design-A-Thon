import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const OneDesign = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [design, setDesign] = useState({
        name: '',
        image: '',
        commentary: '', 
        designer: {},
        challenge: {}
    })
    console.log(id)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/designs/${id}`)
        .then(res => {
            console.log(res)
            setDesign(res.data.design)
            console.log(res.data.design)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div id="one-design">
            <div className="mb-3"><Link to={`/challenges/${design.challenge._id}`}>Back to Designs</Link></div>
            <h1>Theme: { design.challenge.theme } </h1>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <h3 style={{fontFamily: 'cursive'}}>{design.name}</h3>
                    <div className="mb-1 text-body-secondary">Submitted by 
                        <Link to={`/designers/${design.designer._id}`}> {design.designer.username} </Link>
                    </div>
                    <p className="card-text mb-auto">{design.commentary}</p>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img className="one-img" src={design.image} alt="Design Image" />
                </div>
            </div>
        </div>
    )
}

export default OneDesign