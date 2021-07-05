import React, { useEffect } from 'react'
// import ScrollToBottom from 'react-scroll-to-bottom'
import Image from '../Base/Image'

function Message({ messages, me }) {

    // console.log(messages);
    useEffect(() => {
        var mount = true
        // scroll to buttom
        window.scrollTo(0, document.body.scrollHeight);
        return () => {
            mount = false
        }
    }, [messages])



    function TimeFormat({ date }) {
        var date = new Date(date)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        // console.log(date);
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        // console.log(strTime);
        return (
            <span>{strTime}</span>
        )
    }





    // My message
    const MyMessage = ({ message }) => {
        const time = message.createOn.toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
        return (

            <div className="row m-0 mb-1" style={{ justifyContent: 'flex-end' }}>
                <div className="col-xl-8 col-lg-8 col-md-9 col-sm-10 col-xs-10 col-10 p-1">


                    <div className="row m-0">
                        <div className="col">
                            <div style={styles.myMessageLayout} >
                                <div >
                                    {message.text}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row m-0">
                        <div className="col">
                            <div className="" style={styles.myTime}>
                             <TimeFormat date={message.createOn} /> 
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }



    // User message
    const UserMessage = ({ message }) => {
        
        return (

            <div className="row m-0 mb-1" style={{ justifyContent: 'flex-start' }}>
                <div className="col-xl-8 col-lg-8 col-md-9 col-sm-10 col-xs-10 col-10 p-1 ">

                    <div className="row m-0 ">

                        {/* <div className=" col-2">
                        <Image name="Pritam" />
                        </div> */}
                        <div className="col">
                            {/* <Image name="Pritam" /> */}

                            <div style={styles.userMessageLayout} >
                                <div >
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row m-0">
                        <div className="col">
                            <div style={styles.userTime}>
                                <TimeFormat date={message.createOn} />  <i className="fa fa-check" style={{color: 'cadetblue', fontSize: '12px', fontWeight: 555, marginLeft: '10px'}} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }




    return (
        <div style={styles.messageBody} >


            {
                (messages.length > 0 ?
                    messages.map((msg, i) => {
                        return (
                            msg.user === 'admin' ?
                                <div key={i} className="text-center m-auto mt-1 mb-1" style={styles.admin} key={i} >{msg.text}</div>
                                :
                                (msg.sender === me ?
                                    <MyMessage key={i} message={msg} />
                                    : <UserMessage key={i} message={msg} />
                                )
                        )
                    })
                    :
                    <div className="text-center mt-4 mb-4" >Empty chat</div>)
            }
        </div>
    )
}



const styles = {
    messageBody: {
        // backgroundColor: '#add'
        marginBottom: '70px',
        marginTop: '65px'
    },


    myMessageLayout: {
        backgroundColor: "#08d489",
        color: '#fff',
        margin: '2px 0px',
        padding: '10px 15px',
        fontSize: '16px',
        float: 'right',
        // borderRadius: '50px 0px 50px 50px',

        borderRadius: '20px 20px 0px 20px',
        // borderRadius: '0px 30px 0px 30px',

    },


    myTime: {
        float: 'right',
        paddingRight: '10px',
        fontSize: '10px',
        color: "#fafafa"
    },




    userMessageLayout: {
        backgroundColor: "#fff",
        color: '#08d489',
        margin: '2px 0px',
        padding: '10px 15px',
        fontSize: '15px',
        float: 'left',
        borderRadius: '0px 50px 50px 50px'
        // borderRadius: '30px 0px 30px 0px',

    },


    userTime: {
        float: 'left',
        paddingLeft: '10px',
        fontSize: '10px',
        color: '#fff'
    },


    admin: {
        backgroundColor: '#d2d4d3',
        padding: '3px',
        borderRadius: '20px',
        width: '60%',
        fontSize: '12px',
        lineHeight: 'normal'
    }
}



export default Message
