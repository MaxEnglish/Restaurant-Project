import React from 'react';
import '../css/guest-profile.css';
import { RiDeleteBinLine } from 'react-icons/ri';

function GuestProfile (props) {
    return (
        <div className='guest-container'>
            <div className='delete-guest' title="Remove this order" onClick={props.onDelete}><RiDeleteBinLine size={20}/></div>
            <div className='orders-container' onClick={props.onClick} title="Go to this order">
                <div className='list-item'><span className='bolden'>Orders: </span>{`${props.orders ? " " + props.orders : " N/A"}`}</div>   
                <div className='list-item'><span className='bolden'>Special Requests: </span>{`${props.specialRequests.length === 0 ? ' N/A' : " " + props.specialRequests}`}</div>
            </div>
        </div>
    )
}

export default GuestProfile;


