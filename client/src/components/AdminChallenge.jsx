import React, { useState } from 'react'

const AdminChallenge = (props) => {

    const {onSubmitProp, initialTheme, initialPostingDate, errors, btnTxt} = props
    const [theme, setTheme] = useState(initialTheme)
    const [postingDate, setPostingDate] = useState(initialPostingDate)
    
    const submitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({ theme, postingDate })
        setTheme("")
        setPostingDate("")
    }

    return(
        <div className="wrapper1">
            <h1>Challenge Settings</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="theme">Theme</label>
                    <input
                        onChange={(e) => setTheme(e.target.value)}
                        value={theme}
                        id="theme"
                        className="form-control"
                        type="text"
                    />
                    {errors.theme ? <p>{errors.theme.message}</p> : null}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="postingDate">Date Posted</label>
                    <input
                        onChange={(e) => setPostingDate(e.target.value)}
                        value={postingDate}
                        id="postingDate"
                        className="form-control"
                        type="date"
                    />
                    {errors.postingDate ? <p>{errors.postingDate.message}</p> : null}
                </div>
                <br />
                <button className="btn btn-outline-primary" type="submit">{ btnTxt }</button>
            </form>
        </div>
    )
}

export default AdminChallenge