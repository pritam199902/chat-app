import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Toaster from './Toaster';

import LogoutBtn from './LogoutBtn'


function Navbar({ name }) {

    const history = useHistory()




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
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between align-items-center" >


                                <div className="d-flex justify-content-between align-items-center" >
                                    <div className="row m-0 ">
                                        <div className="col px-2">
                                            <div className="row m-0">
                                                <div className="col py-2">
                                                    <span style={{
                                                        color: '#131313',
                                                        fontWidth: 555,
                                                        fontStyle: 'italic',
                                                        fontFamily : 'monospace'
                                                    }} >Hi, {name ? name.split(" ", 1)[0] : "USER"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="d-flex flex-row-reverse">
                                    <LogoutBtn />
                                </div>



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
        color: '#989898',
        fontWidth: 555,
        fontStyle: 'itly'
    },

}


export default Navbar
