import React from 'react';
import '../css/menu-item.css';

function MenuItem (props) {
    return (
        <div className='food-box' onClick={props.onClick}> 
            <div className='item-name'>{`${props.sides.length === 0 ? props.name : props.name + " w/ " + props.sides}`}</div>
            <div className='item-price'>{props.price}</div>
        </div>
    )
}

export default MenuItem;

