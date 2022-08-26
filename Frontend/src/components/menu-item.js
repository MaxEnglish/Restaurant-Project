import React from 'react';
import '../css/menu-item.css';

function MenuItem (props) {
    return (
        <div className='food-box' onClick={props.onClick}> 
            <div className='item-name'>{props.name}</div>
            <div className='item-sides'>{displaySides(props.sides)}</div>
        </div>
    )
}

export default MenuItem;

const displaySides = (sides) => {
    if (sides.length <= 1) {
        return sides;
    } else {
        var sidesWithCommas = [];
        for (let i = 0; i < sides.length - 1; i++) {
            sidesWithCommas.push(sides[i] + ", ")
        }
        sidesWithCommas.push(sides[sides.length - 1])
        return sidesWithCommas;
    }
}