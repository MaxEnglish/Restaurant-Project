import React from 'react';
import '../css/big-button.css';

function BigButton (props) {
    return (
        <button
        className='button-format'
        onClick={props.onClick}
        >
        {props.name}
        </button>
    )
}

export default BigButton;