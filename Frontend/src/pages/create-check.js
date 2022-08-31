import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import BigButton from '../components/big-button';
import Table from '../components/table'
import HomeButton from '../components/home-button';
import '../css/create-check.css';
import { FaSadTear } from 'react-icons/fa';
import GuestOnCheck from '../components/guest-on-check';
var API = require('../Controllers');

function CreateCheck() {

    const [tab, setTab] = useState("tables");
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState();
    const [confirm, setConfirm] = useState(false);

    const getTables = () => {
        API.getTables().then(
            response => response.json()).then(
                data => {
                    setTables(data);
                })
    }

    useEffect(() => {
        getTables()
    }, []);

    return (
        <>
        <HomeButton tab={tab} onClick={() => { setConfirm(true) }} />
            {confirm && (
                <>
                    <div className='outside-container'></div>
                    <div className='buttons-wrapper'>
                        <div>Are you sure you want to go home? Your progress will not be saved</div>
                        <Link to="/">
                            <button className='yes-button'>Yes</button>
                        </Link>
                        <button className='no-button' onClick={() => { setConfirm(false) }}>No</button>
                    </div>
                </>
            )}
            {tab === 'tables' ? (
                tables.length === 0 ? (
                    <div className='no-orders'>There are currently no tables with orders submitted <FaSadTear /> To add a new table, go to "Take Order" on the Home page</div>
                ) : (
                    <div className='tables-container'>
                        {tables.map((myTable, index) => (    //maps through tables constant and creates numbered table elements
                            <Table key={index}
                                name={"Table " + myTable.name}
                                onClick={() => {
                                    setTable(myTable);
                                    setTab('options');
                                }}
                            />
                        ))}
                    </div>
                )) : null}
            {tab === 'options' && (
                <div className='outer-container'>
                    <BigButton name='Single Check' onClick={() => { setTab('single-check') }} />
                    <BigButton name='Split Check' onClick={() => { setTab('split-check') }} />
                </div>
            )}
            {tab === 'split-check' && (
                <div className='outer-container'>
                    <div className='check-headers'>
                        <button className='check-header1'>Split an item via percent</button>
                        <p className='check-header2'>Click on a food item to move it</p>
                        <p className='check-header3'>Orders</p>
                    </div>
                    <div className='check-inner-container'>
                    {table.guests.map((guest, index) => (      //mapping the table's guests
                            <GuestOnCheck key={index}
                            orders={guest.orders}
                            amounts={guest.amounts}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateCheck;
