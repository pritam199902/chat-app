import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'


// Toaster
import Toaster from '../Base/Toaster'
function NotFound() {
    const history = useHistory()


    useEffect(() => {
        history.push('/')
    }, [])

    return (
        <div className="text-center mt-5 text-warning" >
            Invalid URL....
        </div>
    )
}

export default NotFound
