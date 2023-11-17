import React, { useState } from 'react'

const AdminChallenge = (props) => {

    const {onSubmitProp, initialTheme, initialPostingDate, errors, btnTxt} = props
    const [theme, setTheme] = useState(initialTheme)
    const [postingDate, setPostingDate] = useState(initialPostingDate)
    const [status, setStatus] = useState(false)
    
    const submitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({ theme, postingDate, status })
        setTheme("")
        setPostingDate("")
    }

    const dateHandler = (e) => {
        setPostingDate(e.target.value)
        setStatus((new Date(e.target.value) <= new Date()))
    }

    return(
        <div className="wrapper1" id="challenge-form">
            <h1 className="mb-3">Challenge Settings</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group row">
                    <label htmlFor="theme" className="col-sm-3 col-form-label">Theme</label>
                    <div className="col-sm-9">
                        <input
                            onChange={(e) => setTheme(e.target.value)}
                            value={theme}
                            id="theme"
                            className="form-control"
                            type="text"
                        />
                        {errors.theme ? <p>{errors.theme.message}</p> : null}
                    </div>
                </div>
                <br />
                <div className="form-group row">
                    <label htmlFor="postingDate" className="col-sm-3 col-form-label">Posting Date</label>
                    <div className="col-sm-9">
                        <input
                            onChange={ dateHandler }
                            value={postingDate}
                            id="postingDate"
                            className="form-control"
                            type="date"
                        />
                        {errors.postingDate ? <p>{errors.postingDate.message}</p> : null}
                    </div>
                </div>
                <br />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary d-flex justify-content-end" type="submit">{ btnTxt }</button>
                </div>
            </form>
        </div>
    )
}

export default AdminChallenge