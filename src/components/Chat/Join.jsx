import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Loading from '../Base/Loading'
import ErrorMessage from '../Base/ErrorMessage'
import socket from '../socket/Socket'

// Toaster
import Toaster from '../Base/Toaster'

function Join() {
    document.body.style.backgroundColor = "#999999"
    const history = useHistory()

    const email = useRef()
    const name = useRef()
    const password = useRef()
    const [ErrorList, setErrorList] = useState([])

    const [IsLoading, setIsLoading] = useState(true)
    const [IsChecking, setIsChecking] = useState(true)
    const [isLoginPage, setisLoginPage] = useState(false)


    useEffect(() => {
        var mount = true
        const my_profile = localStorage.getItem('my_profile')
        // setTimeout(() => {
        if (mount) {
            setIsLoading(false)
            if (my_profile) {
                setIsChecking(false)
                history.push('/chat')
            }
            setIsChecking(false)
            // }, 2000)
        }

        return () => {
            mount = false
        }

    }, [])






    const onSubmitJoin = (e) => {
        e.preventDefault()
        const data = {
            email: email.current.value,
            name: name.current.value,
            password: password.current.value
        }

        setErrorList([])
        var errorArr = []

        var isError = false
        if (data.email === '') {
            isError = true
            Toaster.warning('Please enter your email!')
            // errorArr.push("Please enter your email!")
        }


        if (data.name === '') {
            isError = true
            Toaster.warning('Please enter your name!')
            // errorArr.push("Please enter your name!")
        }


        if (data.password.length == 0) {
            isError = true
            Toaster.warning('Please enter a valid password!')
            // errorArr.push("Please enter a valid password!")
        }


        if (isError) {
            return
            // return setErrorList(errorArr)
        }


        setIsLoading(true)
        socket.emit("signup", data, (res) => {
            setIsLoading(false)
            // console.log("SIGNUP :: ", res);
            if (res && res.user && !res.error) {
                Toaster.success(res.message)
                localStorage.setItem("my_profile", JSON.stringify(res.user))
                history.push('/chat')
            } else {
                Toaster.info(res.message)
            }
        })
        // setIsLoading(true)
    }





    const onSubmitLogin = (e) => {

        e.preventDefault()
        const data = {
            email: email.current.value,
            password: password.current.value
        }

        setErrorList([])
        var errorArr = []

        var isError = false
        if (data.email === '') {
            isError = true
            Toaster.warning('Please enter your email!')
            // errorArr.push("Please enter your email!")
        }



        if (data.password.length == 0) {
            isError = true
            Toaster.warning('Please enter a valid password!')
            // errorArr.push("Please enter a valid password!")
        }


        if (isError) {
            return
            // return setErrorList(errorArr)
        }


        setIsLoading(true)
        socket.emit("login", data, (res) => {
            setIsLoading(false)
            console.log("login:: ", res);
            if (res && res.user && !res.error) {
                Toaster.success(res.message)
                localStorage.setItem("my_profile", JSON.stringify(res.user))
                history.push('/chat')
            } else {
                Toaster.warning(res.message)
            }
        })

    }





    const ShowErrors = () => {
        return (
            <>
                {
                    ErrorList.length > 0 ?
                        ErrorList.map((msg, i) => {
                            return (
                                <ErrorMessage key={i} message={msg} type="danget" />
                            )
                        })
                        : ""
                }
            </>
        )
    }




    const SignUp = () => {
        return (
            <div className="card">
                <div className="card-header">
                    <div style={{ fontSize: '20px' }} className="card-title text-title mb-0">
                        Signup
                    </div>
                </div>
                <div className="card-body">

                    <ShowErrors />

                    <div className="row">
                        <div className="col-lg-10 col-md-10 m-auto ">


                            <form onSubmit={onSubmitJoin} >
                                <div className="form-outline mb-2">
                                    <input type="text" id="form1Example1" className="form-control" ref={name} />
                                    <label className="form-label" htmlFor="form1Example1" >Name</label>
                                </div>

                                <div className="form-outline mb-2">
                                    <input type="email" id="form1Example2" className="form-control" ref={email} />
                                    <label className="form-label" htmlFor="form1Example2" >Email</label>
                                </div>

                                <div className="form-outline mb-2">
                                    <input type="password" id="form1Example3" className="form-control" ref={password} />
                                    <label className="form-label" htmlFor="form1Example3">Password</label>
                                </div>


                                <button disabled={IsLoading} type="submit" className="btn btn-primary btn-block mt-3">
                                    {IsLoading ? <Loading size={20} /> : "Signup"}
                                </button>
                            </form>


                        </div>
                    </div>

                </div>
            </div>
        )
    }





    const LogIn = () => {
        return (
            <div className="card">
                <div className="card-header">
                    <div style={{ fontSize: '20px' }} className="card-title text-title mb-0">
                        Join Now
                    </div>
                </div>
                <div className="card-body">

                    <ShowErrors />

                    <div className="row">
                        <div className="col-lg-10 col-md-10 m-auto ">


                            <form onSubmit={onSubmitLogin} >
                                <div className="form-outline mb-2">
                                    <input type="email" id="form1Example2" className="form-control" ref={email} />
                                    <label className="form-label" htmlFor="form1Example2" >Email</label>
                                </div>

                                <div className="form-outline mb-2">
                                    <input type="password" id="form1Example3" className="form-control" ref={password} />
                                    <label className="form-label" htmlFor="form1Example3">Password</label>
                                </div>


                                <button disabled={IsLoading} type="submit" className="btn btn-success btn-block mt-3">
                                    {IsLoading ? <Loading size={20} /> : "Join"}
                                </button>
                            </form>


                        </div>
                    </div>

                </div>
            </div>
        )
    }





    return (
        <>
            <div className="text-center mt-5">



                {
                    IsChecking ? <Loading size={50} />
                        :
                        <div className="row m-0">
                            <div className="col-xl-4 col-lg-5 col-md-8 col-sm-10 col-xs-11 m-auto">


                                {isLoginPage ? <LogIn /> : <SignUp />}


                                <div className="mt-4 text-light" style={{ cursor: 'pointer', fontSize: '18px' }} >
                                    {
                                        isLoginPage ?
                                            <div>
                                                Do not have account?
                                                <span onClick={() => setisLoginPage(false)} className="text-primary px-2" >
                                                    Signup now!
                                                </span>
                                            </div>
                                            :
                                            <div>Already have an account?
                                                <span onClick={() => setisLoginPage(true)} className="text-success px-2"  >
                                                    Join now!
                                                </span>
                                            </div>
                                    }
                                </div>


                            </div>
                        </div>
                }



            </div>
        </>
    )
}

export default Join
