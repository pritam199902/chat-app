import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom'
import Toaster from '../Base/Toaster';
import Image from '../Base/Image'



function Users({ userlist, statuslist, state }) {

    const history = useHistory()
    const url = useRouteMatch()
    // console.log(url);
    // console.log(state);
    // console.log(userlist);
    function goToChat({ userid }) {
        // alert("userid : "+ userid)
        return history.push(`/chat/${userid}`)
    }



    const UserRow = ({ data, isOnline }) => {
        /////////////////////////////////////
        // state:  "NEW" => new user list //
        ///////////////////////////////////

        // console.log("single user data :: ", data)
        const { userid, name, image, lastSeen } = data

        return (
            <div className="card" >
                <hr className="my-0" />
                {/* <Link to={`${url.url}/${userid}`} > */}
                <div className="card-body py-2 userlist" data-mdb-dismiss="modal"
                    aria-label="Close" onClick={() => { goToChat({ userid }) }} >
                    <div className="d-flex justify-content-between align-items-center" >


                        <div className="d-flex justify-content-between align-items-center" >
                            {/* <BackBtn /> */}

                            <Image image={image} name={name} />

                            <div className="row m-0 ">
                                <div className="col px-2">


                                    <div className="row m-0">
                                        <div className="col  ">
                                            <span style={styles.userName} >{name ? name : 'USER NAME'}</span>
                                        </div>
                                    </div>
                                    {
                                        !state &&
                                        !isOnline &&

                                        <div className="row m-0">
                                            <div className="col  ">
                                                <span style={styles.option} >last seen {lastSeen ? lastSeen : '10:10 AM'}</span>
                                            </div>
                                        </div>
                                    }


                                </div>
                            </div>
                        </div>


                        {/* <div className="d-flex flex-row-reverse">
                            {
                            // !state &&
                                (isOnline ?
                                    <i className="fas fa-circle fa-sm " style={styles.userStatus}  ></i>
                                    :
                                    <i className="fas fa-circle fa-sm text-danger" style={styles.userStatus}  ></i>
                                )
                            }
                        </div> */}


                    </div>
                </div>
                {/* </Link> */}


                <hr className="my-0" />
            </div>
        )
    }




    return (
        <div>

            {
                userlist && userlist.length > 0 ?
                    userlist.map((data, i) => {
                        const isOnline = statuslist.filter(d => d.userid === data.userid)
                        return (<UserRow key={i} data={data} isOnline={isOnline} />)
                    })
                    :
                    <div className="text-center my-4">
                        -- No Message Yet --
                    </div>
            }


        </div>
    )
}



const styles = {
    userName: {
        color: '#666666',
        fontSize: '17px'
    },
    option: {
        color: '#a9a9a9',
        fontSize: '14px'
    },
    userStatus: {
        fontSize: '12px',
        color: 'rgb(8, 212, 137)'
    },
    userTyping: {
        fontSize: '12px'
    }
}



export default Users
