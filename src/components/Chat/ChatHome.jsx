import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'


import Navbar from "../Base/Navbar";
import BlankNavbar from "../Base/BlankNavbar";

import Chat from "./Chat";
import Users from "./Users";
import Loading from "../Base/Loading";
import MoreContact from './MoreContact'

// socket
import socket from '../socket/Socket'
import Toaster from '../Base/Toaster';



function ChatHome() {
    // console.log("user status : ", socket.connected);

    const history = useHistory()
    const [Profile, setProfile] = useState()

    const [reload, setreload] = useState(false)


    const [UserList, setUserList] = useState([])
    const [ChatUserList, setChatUserList] = useState([])
    const [UserStatus, setUserStatus] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isNewAdded, setisNewAdded] = useState(false)



    useEffect(() => {

        // alert(socket.id)


        // console.log(">>1");
        var mount = true
        const u = localStorage.getItem('my_profile')


        if (u) {
            // verify user sync
            const user = JSON.parse(u)
            // console.log(user);
            socket.emit('verifyUser', user, async ({ error, isVerified }) => {
                // console.log("verify res accept ; ", mount);
                if (isVerified) {

                    if (mount) {
                        // load messages
                        // console.log("profile loaded");
                        setProfile(user)
                        // setIsLoading(false)
                    }

                    const userid = user.userid
                    socket.emit("getAllChatUser", { userid }, ({ users }) => {
                        // console.log("get all chat user res :  ", users);
                        // load messages
                        if (mount) {
                            setChatUserList(users)
                            // setIsLoading(false)
                        }
                    })

                    socket.emit("getAllUser", { userid }, ({ users }) => {
                        console.log("getAllUser :  ", users);
                        // load messages
                        if (mount) {
                            setUserList(users)
                            setIsLoading(false)
                        }
                    })






                } else {
                    Toaster.warning("Please login!")
                    localStorage.removeItem('my_profile')
                    history.push('/')
                }
            })
        } else {
            Toaster.warning("Please login!")
            localStorage.removeItem('my_profile')
            history.push('/')
        }





        socket.on("newUserAdded", ({ load, name }) => {
            console.log("newUserAdded :  ", load);
            // load messages
            if (load) {
                Toaster.info(`${name} is added to your list!`)
                if (mount) {
                    setisNewAdded(load)
                    setreload(!reload)
                    setIsLoading(false)
                }
            }
        })



        socket.on('currentUserStatus', ({status})=>{
            alert("currentUserStatus")
        })


        socket.on("getUserStatus", ({ status }) => {
            console.log("getUserStatus :  ", status);
            // load messages
            if (mount) {
                setUserStatus(status)
                setIsLoading(false)
            }
        })


        // notification
        socket.on("notification", ({ text }) => {
            console.log("notification :  ", text);
            // load messages
            if (mount) {
                alert(text)
            }
        })




        return () => {
            mount = false
        }
    }, [reload])







    return (
        <>
            <BlankNavbar name={Profile ? Profile.name : 'User'} />
            <div className="container-fluid mt-5 pt-3" >
                {isLoading ?
                    <Loading size="50px" />
                    :
                    <>
                        <div className="row m-0 my-2">
                            <div className="col-xl-4 col-lg-5 col-md-8 col-sm-10 col-xs-11 m-auto">

                                {/* user list */}
                                <Users userlist={UserList} statuslist={UserStatus} />
                            </div>
                        </div>

                        {/* more contact floating btn */}
                        {/* <MoreContact userid={Profile ? Profile.userid : null} statuslist={UserStatus} newadded={isNewAdded} /> */}
                    </>
                }
            </div>
        </>
    )
}

export default ChatHome
