import React from 'react'
import errorImg from './images/pageNotFound.png'

export default function invalidpage() {
    return (
        <div className="pageNotFound">
            <h2>404 Page not Found</h2>
            <img  src={errorImg} alt="page not found"></img>
        </div>
    )
}
