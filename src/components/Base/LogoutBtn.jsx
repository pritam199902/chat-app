import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import socket from '../socket/Socket'

function LogoutBtn() {
    const history = useHistory()

    const handleLogout = async () => {
        // Toaster.info("Logged out!")

        const u = localStorage.getItem('my_profile')
        var user;
        if (u) {
            // verify user sync
            user = JSON.parse(u)
            socket.emit('logout', {userid: user.userid})
            // socket.emit('disconnect', {userid: user.userid})

            socket.off()
        }

        localStorage.removeItem('my_profile')
        history.push('/')


    }


    return (
        <div className="row m-0"  >
            <div className="col m-auto " style={{ paddingRight: 0, fontSize: '15px', cursor: 'pointer' }} >
                <i className="fas fa-sign-out-alt text-primary fa-lg p-2" onClick={handleLogout} ></i>
            </div>
        </div>
    )

}

export default LogoutBtn
