import React from 'react';
import '../css/option.css';

function Option (props) {
    return (
        <button 
        className="outer-box box-hover"
        onClick={props.onClick}
        >
            <div className='button-content'>
                <img src={props.icon}/>
                <div className='button-name'>{props.name}</div>
            </div>
        </button>
    )
}

export default Option;

