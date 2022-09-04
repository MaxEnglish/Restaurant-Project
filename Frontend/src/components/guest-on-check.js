import React from 'react';
import '../css/guest-on-check.css';
import { useState } from 'react';

function GuestOnCheck(props) {
const [clicked, setClicked] = useState(-1);

const OCEvent = (index) => {
    setClicked(index);
    props.onClick();
}

    return (
        <div className='check-box'>
            <div className='check-price'>Price: {props.price}</div>
            {props.orders.map((order, index) => (
                <div
                    className={clicked >= 0 && index === clicked ? 'check-order-box backgrounded' : 'check-order-box'}
                    key={index}
                    //onClick={props.onClick}
                    onClick={()=>{OCEvent(index)}}
                >{props.amounts[index] + " " + order.name}
                </div>
            ))}
        </div>
    )
}

export default GuestOnCheck;