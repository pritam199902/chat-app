import React from 'react'

function Error({message}) {
    return (

        <div style={{backgroundColor: "#ffaec7", color: "#b50f41", marginBottom: "5px", padding: "5px 2px" }} >
            {message}
        </div>
        )
    }
    
    export default Error
    




    // <div className={`alert alert-${type?type : 'info'} alert-dismissible fade show`} role="alert">
    //     {message}
    //     <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    //         <span aria-hidden="true">&times;</span>
    //     </button>
    // </div>