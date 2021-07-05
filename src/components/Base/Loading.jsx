import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';

function Loading({ color, size }) {

    return (
        <div className="row m-0 my-2" >
            <div className="col m-auto">
                <ReactLoading className="m-auto" type={"spin"} color={color ? color : "#fff"} height={size ? size : 200} width={size ? size : 200} />
            </div>
        </div>
    )
}




export default Loading
