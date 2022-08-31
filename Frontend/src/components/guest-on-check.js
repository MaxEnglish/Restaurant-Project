import React from 'react';
import '../css/guest-on-check.css';

function GuestOnCheck (props) {
    return (
        <div className='check-box'>
            <div className='check-price'>Price: {props.price}</div>
            {props.orders.map((order, index) => (
                <div className='check-order-box' key={index}>{props.amounts[index] + " " + order.name + `${order.sides.length > 0 ? " w/ " + order.sides : ''}`}</div>
            ))}
        </div>
    )
}

export default GuestOnCheck;