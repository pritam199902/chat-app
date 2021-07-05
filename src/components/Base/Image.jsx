import React from 'react'

function Image({ image, name }) {
    // console.log(name);
    return (
        <div>
            {
                name ?
                    <div
                        className="rounded-circle ml-2 p-0.5 m-auto text-center align-item-center"
                        style={{ height: '45px', width: '45px', objectFit: 'cover', color: '#fff', fontSize: '22px', backgroundColor: '#767676', padding: '7px', fontWeight: 565 }}
                    >
                        {name.toString()[0].toUpperCase()}
                    </div>
                    :
                    <img
                        src="/user2.png"
                        className="rounded-circle ml-2 p-0.5 m-auto"
                        alt=""
                        loading="lazy"
                        style={{ height: '50px', width: '50px', objectFit: 'cover', backgroundColor: '#767676', padding: '2px' }}
                    />
            }
        </div>
    )
}

export default Image
