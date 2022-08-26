import React from 'react';
import { useEffect } from 'react';
import '../css/order-item.css';
import { TiDelete } from 'react-icons/ti'

function OrderItem(props) {

    /*useEffect(()=> {
        document.getElementById("newObject").setAttribute('value',1)
    },[])*/
    return (
        <div className='order-box'>
            <div className='food-name'>{`${props.sides.length !== 0 ? props.name + ' w/ ' + props.sides : props.name}`}</div>
            <input
            id="newObject"
            className='amount'
            type="number"
            onChange = {props.onChange}
            placeholder={1}
            min={0}
            >
            </input>
            <button
            className='special-req'
            //onClick={props.onClick}
            >
            Add special request    
            </button>
            <div onClick={props.onClick} className='delete-button'><TiDelete size={35} color="red"/></div>
        </div>
    )
}

export default OrderItem;
