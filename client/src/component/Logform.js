import React from 'react'
import { Link } from 'react-router-dom'

const Logform = () => {
    return (
        <div>
            <form action="" className="py-2">
                <div className="form-floating mb-3">
                    <input type="email" autoComplete="off" className="form-control login-box" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Enrollment number</label>
                </div>
                <div className="d-grid gap-2 mt-4">
                <Link className='pageLink' to="/dashboard"><button className="btn login-btn" type="button">Login</button></Link>
                </div>
            </form>
        </div>
    )
}

export default Logform