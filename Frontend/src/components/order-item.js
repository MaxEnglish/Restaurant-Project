import React from 'react';
import '../css/order-item.css';
import { TiDelete } from 'react-icons/ti'

function OrderItem(props) {

    return (
        <div className='order-box'>
            <div className='food-name'>{`${props.sides.length !== 0 ? props.name + ' w/ ' + props.sides : props.name}`}</div>
            <input
            contentEditable={true}
            className='amount'
            type="number"
            onChange = {props.onChange}
            defaultValue={props.value}
            min={0}
            >
            </input>
            <div onClick={props.onClick} className='delete-button'><TiDelete size={35} color="red"/></div>
        </div>
    )
}

export default OrderItem;
