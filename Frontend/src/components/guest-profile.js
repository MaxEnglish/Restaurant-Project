import React from 'react';
import '../css/guest-profile.css';

function GuestProfile (props) {
    return (
        <div className='guest-container' onClick={props.onClick}>
            <div className='list-item'><span className='bolden'>Orders: </span>{" " + props.orders}</div>   
            <div className='list-item'><span className='bolden'>Special Requests: </span>{`${props.specialRequests.length === 0 ? ' N/A' : " " + props.specialRequests}`}</div>
        </div>
    )
}

export default GuestProfile;


