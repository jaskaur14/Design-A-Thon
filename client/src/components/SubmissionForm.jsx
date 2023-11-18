import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../components/UserDetails'

const Form = (props) => {

    const {id} = useParams()
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [thisChallenge, setThisChallenge] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [newImage, setNewImage] = useState(false)
    const navigate = useNavigate()
    const [design, setDesign] = useState({
        name: '',
        image: '',
        commentary: '', 
        designer: currentUser._id, 
        challenge: id
    })
    const [previewSource, setPreviewSource] = useState()
    // const [error, setError] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/challenges/" + id)
        .then((res)=>{
            console.log(res)
            setThisChallenge(res.data.challenge)
            setLoaded(true)
        })
        .catch((err)=>{
            console.log(err);
        })    
    }, [loaded])

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(e.target.name === 'image') {
            const image = e.target.files[0];
            setDesign({...design, [name]: image})
            setPreviewSource(URL.createObjectURL(image))
            setNewImage(true)
        }else{
            setDesign({...design, [name]: value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        for(let [key, value] of Object.entries(design)){
            formData.append(key, value)
        }
        axios.post("http://localhost:8000/api/designs", formData, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate("/main")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // const previewFile = (file) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result)
    //     }
    // }
    
    return (
        <div id="submit-form">
            { loaded && <h1>Theme: { thisChallenge.theme }</h1> }
            <div className="row">
                <div className="col-sm-6 px-3">
                    <h3 style={{fontFamily: 'copperplate'}} className="my-3">Submit a new design</h3>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    { loaded && 
                        <input type="hidden" id="challenge" name="challenge" value={ thisChallenge._id } />                
                    }
                        <input type="hidden" id="designer" name="designer" value={ currentUser._id } />
                        <div className="row mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name: </label>
                            <div className="col-sm-10">
                                <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                onChange={handleChange} />
                                {/* {
                                    error.name ? <p>{error.name.message}</p> : null
                                } */}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <label htmlFor="image" className="col-sm-2 col-form-label">Design: </label>
                            <div className="col-sm-10">
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    name="image" 
                                    onChange={handleChange} />
                                    {/* {
                                        error.image ? <p>{error.image.message}</p> : null
                                    } */}
                            </div>
                        </div>
                        <label htmlFor="commentary" className="col-sm-2 col-form-label">Commentary: </label>
                        <textarea 
                            name="commentary" 
                            className="form-control" 
                            cols="30" 
                            rows="10" 
                            onChange={handleChange} />
                        {/* {
                            error.commentary ? <p>{error.commentary.message}</p> : null
                        } */}
                        <div className="d-flex justify-content-end">
                            <button className="m-2">Submit</button>
                            <Link to={"/main"}>
                                <button className="m-2">Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-sm-6 px-3">
                    <p style={{fontFamily: 'copperplate'}} className="mt-5">Image Preview</p>
                    <div className="col">
                        <div className="card shadow-sm">
                        { newImage && 
                            <img src={previewSource} alt="Uploaded Image" />
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form