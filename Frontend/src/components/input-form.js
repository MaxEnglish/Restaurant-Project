import React from 'react';
import '../css/input-form.css';
import { TiDelete } from 'react-icons/ti'

function InputForm (props) {
    return(
        <>
            <div className='outside-container'></div>
            <button
                className='cancel-button'
                onClick={props.onClick}
                >
                <TiDelete size={40}/>
            </button>
            <textarea className='text-space' onChange={props.onChange} defaultValue={props.value}></textarea>
            <button className='submitting' onClick={props.onClick}>
                Submit Special Request
            </button>
        </>
    )
}

export default InputForm;