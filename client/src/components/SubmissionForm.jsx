import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Form = () => {
    const navigate = useNavigate()
    const [design, setDesign] = useState({
        name: '',
        image: '',
        commentary: ''
    })

    const [error, setError] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(e.target.name === 'image') {
            const image = e.target.files[0];
            setDesign({...design, [name]: image})
        }else{
            setDesign({...design, [name]: value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/designs", design)
            .then(res => {
                console.log(res)
                navigate("/main")
            })
            .catch(err => {
                console.log(err.response.data.error.errors)
                setError(err.response.data.error.errors)
            })
    }

    return (
        <div>
            <h2 style={{fontFamily: 'copperplate'}}>Add a new Submission:</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div>
                    <label htmlFor="">Name: </label>
                    <input type="text" name="name" onChange={handleChange} />
                    {
                        error.name ? <p>{error.name.message}</p> : null
                    }
                </div>
                <div>
                    <label htmlFor="">Design: </label>
                    <input type="file" name="image" onChange={handleChange} />
                    {
                        error.image ? <p>{error.image.message}</p> : null
                    }
                </div>
                <div>
                    <label htmlFor="">Add Commentary: </label>
                    <textarea name="commentary" cols="30" rows="10" onChange={handleChange} />
                    {
                        error.commentary ? <p>{error.commentary.message}</p> : null
                    }
                </div>
                <button>Submit</button>
                <Link to={"/main"}>
                    <button>Cancel</button>
                </Link>
            </form>
        </div>
    )
}

export default Form