import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../css/home-button.css';

function HomeButton(props) {
    return (
        <>
            {props.tab !== 'tables' && (
                <div className='box' onClick={props.onClick}> 
                    <AiOutlineHome size={35}/>
                </div>
            )}
            {props.tab === 'tables' && (
                <Link to="/">
                    <div className='box'> 
                        <AiOutlineHome size={35}/>
                    </div>
                </Link>
            )}
        </>
    )
}

export default HomeButton;