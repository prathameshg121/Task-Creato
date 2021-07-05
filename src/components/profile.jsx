import React from 'react'

export default function Profile(proc) {
    proc.checkLogin(true);
    return (
        <div className="outer">
            <h1>Profile</h1>
        </div>
    )
}
