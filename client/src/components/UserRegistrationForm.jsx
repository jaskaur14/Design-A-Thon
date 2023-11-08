import React, { useState } from 'react'

const UserRegistrationForm = (props) => {

    const { onSubmitProp, errors, initialUsername, initialEmail, initialPassword, initialAboutMe, btnTxt } = props
    const [username, setUsername] = useState(initialUsername)
    const [email, setEmail] = useState(initialEmail)
    const [password, setPassword] = useState(initialPassword)
    const [cfmPassword, setCfmPassword] = useState("")
    const [aboutMe, setAboutMe] = useState(initialAboutMe)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({ username, email, password, cfmPassword, aboutMe })
    }

    return(
        <form onSubmit={ onSubmitHandler }>
            <div className="row">
                <div className="col-sm-6 px-3">
                { errors.username ? 
                    <p className="text-danger mx-3">{ errors.username.message }</p>
                    : null
                }
                    <div className="row mb-3">
                        <label htmlFor='username' className="form-label col-sm-4">Username</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="username" name="username" value={ username } onChange={(e)=>setUsername(e.target.value)} />
                        </div>
                    </div>
                { errors.email ? 
                    <p className="text-danger mx-3">{ errors.email.message }</p>
                    : null
                }
                    <div className="row mb-3">
                        <label htmlFor='email' className="form-label col-sm-4">Email</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control" id="email" name="email" value={ email } onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                    </div>
                { errors.password ? 
                    <p className="text-danger mx-3">{ errors.password.message }</p>
                    : null
                }
                    <div className="row mb-3">
                        <label htmlFor='password' className="form-label col-sm-4">Password</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" id="password" name="password" value={ password } onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='cfmPassword' className="form-label col-sm-4">Re-Enter Password</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" id="cfmPassword" name="cfmPassword" value={ cfmPassword } onChange={(e)=>setCfmPassword(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 px-3">
                    <div className="row mb-3">
                        <label htmlFor='aboutMe' className="form-label col-sm-4">About Me (optional)</label>
                        <div className="col-sm-8">
                            <textarea id="aboutMe" className="form-control" name="aboutMe" rows="7" value={ aboutMe } onChange={(e)=>setAboutMe(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-dark px-4" type="submit">{ btnTxt }</button>
            </div>
        </form>
    )
}

export default UserRegistrationForm