import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const OneDesign = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [design, setDesign] = useState({
        image: '',
        commentary: ''
    })
    console.log(id)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/designs/${id}`)
        .then(res => {
            console.log(res)
            setDesigns(res.data.design)
            console.log(Array.isArray(res.data.designs)) 
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <h1 style={{fontFamily: 'cursive'}}>{design.name}</h1>
            <img src={design.image} alt="Design Image" />
            <p>Commentary: {design.commentary}</p>
        </div>
    )
}
export default OneDesign