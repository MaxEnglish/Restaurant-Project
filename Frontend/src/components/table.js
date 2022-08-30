import React from 'react';
import '../css/table.css';

function Table (props) {
    return (
        <>
            <div 
            className="table"
            onClick={props.onClick}
            >
                {props.name}
            </div>
        </>
    )
}

export default Table;
