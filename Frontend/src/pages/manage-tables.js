import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import '../css/take-order.css';
import HomeButton from '../components/home-button';
import Table from '../components/table'
import GuestProfile from '../components/guest-profile';
import { FaSadTear } from 'react-icons/fa'
var API = require('../Controllers');

function ManageTables() {

    const getTables = () => {
        API.getTables().then(
            response => response.json()).then(
                data => {
                    setTables(data);
                })
    }

    const replaceTable = (data) => {
        API.replaceTable(JSON.stringify(data));
    }


    useEffect(() => {
        getTables()
    }, [])

    const [tables, setTables] = useState([]);
    const [table, setTable] = useState();
    const [confirm, setConfirm] = useState(false);
    const [tab, setTab] = useState('tables');
    const [guestIndex, setGuestIndex] = useState();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    return (
        <>
            <HomeButton tab={tab} onClick={() => { setConfirm(true) }} />
            {confirm && (
                <>
                    <div className='outside-container'></div>
                    <div className='buttons-wrapper'>
                        <div>Are you sure you want to go home? Your order edits will not be saved</div>
                        <Link to="/">
                            <button className='yes-button'>Yes</button>
                        </Link>
                        <button className='no-button' onClick={() => { setConfirm(false) }}>No</button>
                    </div>
                </>
            )}

            {tab === 'tables' ? (
                tables.length === 0 ? (
                    <div>There are currently no tables to manage <FaSadTear /> To add a new table, go to "Take Order" on the Home page</div>
                ) : (
                    <div className='tables-container'>
                        {tables.map((myTable, index) => (    //maps through tables constant and creates numbered table elements
                            <Table key={index}
                                name={"Table " + myTable.name}
                                onClick={() => {
                                    setTable(myTable);
                                    setGuestIndex(myTable.name)
                                    setTab('review');
                                }}
                            />
                        ))}
                    </div>
                )) : null}

            {tab === "review" && (
                <div className='review-container'>
                    <div className='inner-container'>
                        {table.guests.map((guest, index) => (      //mapping the table's guests
                            <GuestProfile key={index}
                                orders={ordersToString(guest.orders)}
                                specialRequests={guest.specialRequests}
                                onClick={() => {     //redirect to orders tab 
                                    setGuestIndex(index);
                                    setTab('orders');
                                }}
                                onDelete={() => {
                                    var tempTable = table;
                                    tempTable.splice(index, 1)
                                    setTable(tempTable)
                                    forceUpdate();
                                }}
                            />
                        ))
                        }
                    </div>
                    <Link to="/">
                        <button
                            className='new-customer-button'
                            onClick={() => {
                                replaceTable(table);
                            }}
                        >Save Table
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}


export default ManageTables;

const ordersToString = (orders) => {
    if(orders.length > 0) {
        var ordersString = orders[0].name
        if(orders.length > 1){
            for (var i = 1; i < orders.length - 1; i++) {
                ordersString.push(", " + orders[i].name);
            }
        }
    }
    return ordersString;
}