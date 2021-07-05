import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import Loading from "../Base/Loading";
// socket
import socket from '../socket/Socket'
import Toaster from '../Base/Toaster';
import Users from './Users.jsx'

function ContactList({ userid, statuslist, newadded }) {

    // console.log("status list : ", statuslist);


    const [ChatUserList, setChatUserList] = useState([])
    const [load, setload] = useState(false)
    const [IsLoading, setIsLoading] = useState(true)


    useEffect(() => {
        var mount = true

        // console.log(userid);
        socket.emit("getAllUser", { userid }, ({ users }) => {
            // console.log("get all user res :  ", users);
            // load messages
            if (mount) {
                setChatUserList(users)
                setIsLoading(false)
            }
        })


        return () => {
            mount = false
        }
    }, [load, newadded])




    return (
        <div>
            
            <div className="fixed-action-btn" >
                <button type="button" className=" btn btn-primary btn-floating shadow-2-strong" 
                    data-mdb-target="#list"
                    onClick={() => setload(!load)} >
                    <i className="fas fa-plus"></i>
                </button>
            </div>




            {/* <div className="fixed-action-btn " >  */}
                {/* <button type="button" className=" btn btn-dark btn-floating shadow-2-strong" data-mdb-toggle="modal"
                    data-mdb-target="#list"
                    // onClick={() => setload(!load)}
                >
                    <i className="fas fa-plus"></i>
                </button> */}
            {/* </div> */}




            <div
                className="modal fade"
                id="list"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <h5 className="modal-title" id="exampleModalLabel">All Contacts</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-mdb-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body px-1 py-0 " style={{ backgroundColor: '#ddd' }}>

                            {
                                IsLoading ? <Loading size={'50px'} />
                                    :
                                    <Users userlist={ChatUserList} statuslist={statuslist} state="NEW" />
                            }


                        </div>
                    </div>
                </div>
            </div>

            {/* </div> */}

        </div>
    )
}

export default ContactList
