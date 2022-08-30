import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import Option from '../components/option';

function Home () {
    return(
        <>
            <Link to="/take-order">
                <Option 
                name='Take Order'
                />
            </Link>
            <Link to="/manage-tables">
                <Option
                name='Manage Tables'
                />
            </Link>
            <Link to="/create-check">
                <Option 
                name='Create Check'
                />
            </Link>
        </>
    )
}

export default Home;
