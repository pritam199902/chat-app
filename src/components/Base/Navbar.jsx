import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Toaster from './Toaster';
import Loading from './Loading'

import LogoutBtn from './LogoutBtn'
import Image from './Image'



function Navbar({ user, isOnline, isLoading }) {
    const history = useHistory()

    // console.log("NAVBAR USER:", user);


    const Online = () => {
        return (
            <>
                <i className="fas fa-circle fa-sm" style={styles.userStatus}  ></i> <span style={styles.userStatus} >Online</span>
            </>
        )
    }




    const Typing = () => {
        return (
            <span style={styles.userTyping} >typing...</span>
        )
    }

    const LastSeen = () => {
        return (
            <span style={styles.userTyping} >last seen 12:20 PM</span>
        )
    }


    const BackBtn = () => {
        return (
            <div className="row m-0">
                <div className="col" style={{ paddingLeft: 0 }} >

                    <Link to="/" >
                        <i className="mr-3 fas fa-arrow-left"></i>
                    </Link>

                </div>
            </div>
        )
    }





    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-1 shadow-3-strong" style={{
            position: 'fixed',
            top: '0px',
            width: '100%',
            zIndex: 1000
            // paddingRight: '10px'
        }}>
            <div className="row m-0" style={{ width: '100%' }} >
                <div className="col-xl-4 col-lg-5 col-md-8 col-sm-10 col-xs-11 m-auto">
                    <div className="row m-0">
                        <div className="col">
                            <div className="d-flex justify-content-between align-items-center" >

                                <div className="d-flex justify-content-between align-items-center" >
                                    <BackBtn />

                                    {
                                        isLoading ? <Loading size={30} color="#a6a6a6" />
                                            :
                                            <>


                                                <Image name={user ? user.name : null} image={user ? user.image : null} I />

                                                <div className="row m-0 ">
                                                    <div className="col px-2">
                                                        <div className="row m-0">
                                                            <div className="col  ">
                                                                <span style={styles.userName} >{user ? user.name : 'USER NAME'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="row m-0">
                                                            <div className="col py-0">

                                                                {/* 
                                                    {isOnline && <Online /> } */}
                                                                {/* <Typing /> */}
                                                                {/* <LastSeen /> */}


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                    }


                                </div>
                                {/* <div className="d-flex flex-row-reverse">
                                    <LogoutBtn />
                                </div> */}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}



const styles = {
    userName: {

    },
    userStatus: {
        color: 'rgb(8, 212, 137)',
        fontSize: '12px'
    },
    userTyping: {
        fontSize: '12px'
    }
}


export default Navbar
