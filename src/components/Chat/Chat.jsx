import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import ReactLoading from 'react-loading';
import Loading from '../Base/Loading'
import Navbar from '../Base/Navbar'

import ErrorMessage from '../Base/ErrorMessage'
import Message from '../Message/Message.jsx'


// socket
import socket from '../socket/Socket'


function Chat() {
    const { userid } = useParams()

    const history = useHistory()

    const [messages, setmessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sending, setsending] = useState(false)
    const [Profile, setProfile] = useState()
    const [CurrentUser, setCurrentUser] = useState()
    const [CurrentUserStatus, setCurrentUserStatus] = useState()


    const inputRef = useRef()



    useEffect(() => {
        var mount = true
        // load profile
        const u = localStorage.getItem('my_profile')
        var user;
        if (u) {
            // verify user sync
            user = JSON.parse(u)
            if (mount) {
                setProfile(user)
            }
        }






        socket.emit("join", { userid, myuserid: user.userid }, ({ error, join, user, list }) => {
            // //load user details
            if (join) {
                // console.log("JOIN :: ", list);
                if (mount) {
                    // load messages
                    // console.log("get current user :  ", user);
                    setCurrentUser(user)
                    setmessages([...list])
                    setIsLoading(false)
                }
            } else {
                if (mount) {
                    setIsLoading(false)
                }
                return history.push("/login")
            }

        })







        return () => {
            mount = false
            // socket.emit('disconnect', {})
            // socket.off()
        }
    }, [])




    useEffect(() => {
        socket.on("message", (list) => {
            // load messages
            // console.log(list);
            // alert("mesgae received")

            setmessages(list)
            setIsLoading(false)
            // inputRef.current.focus()

        })


    }, [])





    ///////////////////////////
    // Handler functions    //
    /////////////////////////

    // const handleMessage = (e) => {
    //     console.log(e.target.value);
    //     setmessage(e.target.value)
    // }

    const handleSendMessage = (e) => {
        e.preventDefault()
        setsending(true)
        var msg = inputRef.current.value
        msg = msg.trim()
        const data = {
            sender: Profile.userid,
            receiver: userid,
            text: msg,
            date: new Date(),
            isSent: false
        }



        if (msg.length > 0) {
            socket.emit('sendMessage', { data }, (res) => {
                // console.log(res);
                if (res && res.error) {
                    setsending(false)
                    alert(res.error)
                    return history.push('/chat')
                }

                if(res.list){
                    // console.log("list :::::::::", res.list);
                    // alert("new ")
                    setmessages(res.list)
                }
                
                
                setsending(false)
                inputRef.current.focus()
                inputRef.current.value = ''
            })
        }else{
            setsending(false)
        }

       
    }




    /////////////////////////////////////////////////////////////////////////////////////////////
    // JSX COMPONENT                                                                          //
    ///////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>

            <Navbar isLoading={isLoading} user={CurrentUser ? CurrentUser : null} />


            <div className="row m-0">
                <div className="col-xl-4 col-lg-5 col-md-8 col-sm-10 col-xs-11 m-auto">
                    {/* <div className="text-primary text-title mb-4" style={{ fontSize: '22px' }} >{myroom}</div> */}
                    {isLoading ? <Loading size={35} /> :
                        <Message messages={messages} me={Profile.userid} />
                    }
                    <div className="row m-0 px-2" style={styles.inputDiv} >
                        <div className="col-11 p-0">

                            <form onSubmit={handleSendMessage} className="p-0 form-inline" >
                                <div className="input-group mb-3">
                                    <input
                                        // value={message}
                                        // onChange={handleMessage}
                                        type="text"
                                        ref={inputRef}
                                        disabled={isLoading}
                                        style={styles.inputMessageBox}
                                        className="form-control shadow-3-strong "
                                        placeholder="Type here..."
                                        aria-label="Recipient's username"
                                        aria-describedby="button-addon2" />
                                    <button
                                        style={!sending ? styles.btnMessageBox : styles.btnLoading }
                                        disabled={isLoading || sending}
                                        className="btn btn-primary shadow-3-strong"
                                        type="submit"
                                        id="button-addon2"
                                        data-mdb-ripple-color="dark">
                                        {sending ? <ReactLoading className="m-auto" type={"spin"} color="#fff" height={25} width={25} /> : <i className="fas fa-paper-plane"></i>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



const styles = {
    inputDiv: {
        position: 'fixed',
        bottom: '0.2px',
        width: 'inherit',
        // paddingRight: '10px'
    },
    inputMessageBox: {
        padding: '25px 20px',
        borderRadius: '20px'
    },
    btnMessageBox: {
        padding: '10px 17px',
        borderRadius: '40px',
        marginLeft: '6px',
        fontSize: '17px'

    }, 
    btnLoading: {
        padding: '1px 15px',
        borderRadius: '40px',
        marginLeft: '6px',
        fontSize: '10px'
    }



}




export default Chat
