import React from 'react';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className='not-found'>
            <div>
                <h1>404</h1>
                <h2>Page not found ! !</h2>
                <h2><Link to="/">Home</Link></h2>
            </div>
        </div>
    )
}

export default NotFound;
