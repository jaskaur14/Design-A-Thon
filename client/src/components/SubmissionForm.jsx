import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../components/UserDetails'

const Form = (props) => {

    const {id} = useParams()
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [thisChallenge, setThisChallenge] = useState({})
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()
    const [design, setDesign] = useState({
        name: '',
        image: '',
        commentary: '', 
        designer: currentUser._id, 
        challenge: id
    })
    // const [previewSource, setPreviewSource] = useState()
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
        <div>
            { loaded && <h1>Theme: { thisChallenge.theme }</h1> }
            <h3 style={{fontFamily: 'copperplate'}}>Add a new Submission:</h3>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
            { loaded && 
                <input type="hidden" id="challenge" name="challenge" value={ thisChallenge._id } />                
            }
                <input type="hidden" id="designer" name="designer" value={ currentUser._id } />
                <div>
                    <label htmlFor="">Name: </label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    onChange={handleChange} />
                    {/* {
                        error.name ? <p>{error.name.message}</p> : null
                    } */}
                </div>
                <div>
                    <label htmlFor="">Design: </label>
                    <input 
                    type="file" 
                    className="form-control" 
                    name="image" 
                    onChange={handleChange} />
                    {/* {
                        error.image ? <p>{error.image.message}</p> : null
                    } */}
                </div>
                <div>
                    <label htmlFor="">Add Commentary: </label>
                    <textarea 
                    name="commentary" 
                    className="form-control" 
                    cols="30" 
                    rows="10" 
                    onChange={handleChange} />
                    {/* {
                        error.commentary ? <p>{error.commentary.message}</p> : null
                    } */}
                </div>
                <button>Submit</button>
                <Link to={"/main"}>
                    <button>Cancel</button>
                </Link>
            </form>
            {/* {previewSource && (
                <img src={previewSource} alt= "selected"
                style={{height: '300px' }} />
            )} */}
        </div>
    )
}

export default Form

// const Form = () => {
//     const navigate = useNavigate()
//     const [previewSource, setPreviewSource] = useState()
//     const [design, setDesign] = useState({
//         name: '',
//         image: '',
//         commentary: ''
//     })

//     const [error, setError] = useState({})

//     const handleChange = (e) => {
//         const {name, value} = e.target;
//         if(e.target.name === 'image') {
//             const image = e.target.files[0];
//             setDesign({...design, [name]: image})
//         }else{
//             setDesign({...design, [name]: value})
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post("http://localhost:8000/api/designs", design)
//             .then(res => {
//                 console.log(res)
//                 navigate("/main")
//             })
//             .catch(err => {
//                 console.log(err.response.data.error.errors)
//                 setError(err.response.data.error.errors)
//             })
//     }

//     const previewFile = (file) => {
//         const reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onloadend = () => {
//             setPreviewSource(reader.result)
//         }
//     }

//     return (
//         <div>
//             <h2 style={{fontFamily: 'copperplate'}}>Add a new Submission:</h2>
//             <form onSubmit={handleSubmit} encType='multipart/form-data'>
//                 <div>
//                     <label htmlFor="">Name: </label>
//                     <input type="text" 
//                     className="form-control" 
//                     name="name" 
//                     onChange={handleChange} />
//                     {
//                         error.name ? <p>{error.name.message}</p> : null
//                     }
//                 </div>
//                 <div>
//                     <label htmlFor="">Design: </label>
//                     <input type="file" 
//                     className="form-control" 
//                     name="image" 
//                     onChange={handleChange} />
//                     {
//                         error.image ? <p>{error.image.message}</p> : null
//                     }
//                 </div>
//                 <div>
//                     <label htmlFor="">Add Commentary: </label>
//                     <textarea name="commentary" 
//                     className="form-control" 
//                     cols="30" rows="10" 
//                     onChange={handleChange} />
//                     {
//                         error.commentary ? <p>{error.commentary.message}</p> : null
//                     }
//                 </div>
//                 <button>Submit</button>
//                 <Link to={"/main"}>
//                     <button>Cancel</button>
//                 </Link>
//             </form>
//             {previewSource && (
//                 <img src={previewSource} alt= "selected"
//                 style={{height: '300px' }} />
//             )}
//         </div>
//     )
// }