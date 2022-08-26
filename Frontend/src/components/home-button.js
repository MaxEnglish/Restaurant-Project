import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../css/home-button.css';


function HomeButton(props) {
    return (
        <Link to="/">
            <div className='box'> 
                <AiOutlineHome size={35}/>
            </div>
        </Link>
    )
}

export default HomeButton;