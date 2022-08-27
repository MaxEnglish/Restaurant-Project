import React from 'react';
import '../css/guest-profile.css';
import { RiDeleteBinLine } from 'react-icons/ri';

function GuestProfile (props) {
    return (
        <div className='guest-container'>
            <div className='delete-guest' title="Remove this customer" onClick={props.onSelect}><RiDeleteBinLine size={20}/></div>
            <div className='orders-container' onClick={props.onClick} title="Go to this order">
                <div className='list-item'><span className='bolden'>Orders: </span>{" " + props.orders}</div>   
                <div className='list-item'><span className='bolden'>Special Requests: </span>{`${props.specialRequests.length === 0 ? ' N/A' : " " + props.specialRequests}`}</div>
            </div>
        </div>
    )
}

export default GuestProfile;


//to make fetch happen asynchronously, call the api, read the response, then update the menu