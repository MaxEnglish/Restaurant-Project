import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom'
import BigButton from '../components/big-button';
import Table from '../components/table'
import HomeButton from '../components/home-button';
import '../css/create-check.css';
import { FaSadTear } from 'react-icons/fa';
import '../css/guest-on-check.css';
import { IoTThingsGraph } from 'aws-sdk';
//import GuestOnCheck from '../components/guest-on-check';
var API = require('../Controllers');

function CreateCheck() {

    const [tab, setTab] = useState("tables");
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState();
    const [confirm, setConfirm] = useState(false);
    const [moving, setMoving] = useState(false);
    const [clicked, setClicked] = useState({ order: '', amount: 0, index: -1, guestIndex: -1 });
    const [percenting, setPercenting] = useState('');
    const [splitWith, setSplitWith] = useState([]);
    const [parentEl, setParentEl] = useState();

    const [, forceUpdate] = useReducer(x => x + 1, 0);  //forces the rerendering of an element

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



    function GuestOnCheck(props) {
        return (
            <div
                className={(percenting.length > 25 && checkIfContains(props.parentIndex, splitWith)) ? 'check-box backgrounded selected' : moving ? 'check-box selected' : 'check-box'}
                onClick={props.onClick}
            >
                <div className='check-price'>Price: {props.price}</div>
                {props.orders.map((order, index) => (
                    <div
                        className={(clicked.order === order && index === clicked.index && parentEl === clicked.guestIndex)  ? 'check-order-box backgrounded' : 'check-order-box'}
                        key={index}
                        onClick={() => {
                            setParentEl(props.parentIndex);
                            var amount = props.amounts[index];
                            var guestIndex = props.parentIndex;
                            if (!moving && percenting.length < 1) {
                                setMoving(true);
                                setClicked({ order, amount, index, guestIndex });
                            } else if (percenting.length > 0 && percenting.length < 25) {
                                setClicked({ order, amount, index, guestIndex });
                                setPercenting("Select the customers you'd like to split between")
                            }
                        }}
                    >{props.amounts[index] + " " + order.name}
                    </div>
                ))}
            </div>
        )
    }

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
                        <button 
                        className='check-header1'
                        onClick={()=> {
                            setPercenting('Select an item to split');
                        }}
                        >Split an item via percent
                        </button>
                        <p className='check-header2'>Click on a food item to move it</p>
                        <p className='check-header3'>Orders</p>
                    </div>
                    <div className='check-inner-container'>
                        {table.guests.map((guest, index) => (      //mapping the table's guests
                            <GuestOnCheck key={index}
                                orders={guest.orders}
                                amounts={guest.amounts}
                                parentIndex={index}
                                onClick={() => {
                                    if (moving && index !== clicked.guestIndex) {
                                        let tempTable = table;
                                        //tempTable.guests[clicked.guestIndex].amounts[clicked.index] === 1
                                        if (clicked.amount === 1) {
                                            tempTable.guests[clicked.guestIndex].orders.splice(clicked.index, 1);
                                            tempTable.guests[clicked.guestIndex].amounts.splice(clicked.index, 1);
                                        } else {
                                            tempTable.guests[clicked.guestIndex].amounts[clicked.index]--;
                                        }

                                        if (hasOrder(tempTable.guests[index].orders, clicked.order)) {
                                            tempTable.guests[index].amounts[ordersToNames(tempTable.guests[index].orders).indexOf(clicked.order.name)]++;
                                        } else {
                                            tempTable.guests[index].orders.push(clicked.order);
                                            tempTable.guests[index].amounts.push(1);
                                        }
                                        setTable(tempTable)
                                        setMoving(false);
                                        setClicked({ order: '', amount: 0, index: -1, guestIndex: -1 })
                                    } else if (percenting.length > 0 && percenting.length > 25 && !checkIfContains(index, splitWith)) {
                                        let tempSplitWith = splitWith;
                                        tempSplitWith.push(index)
                                        setSplitWith(tempSplitWith);
                                        console.log("POG");
                                        forceUpdate();
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
            {moving && (
                <>
                    <div className='moving-screen'></div>
                    <p className='moving-msg'>Click where you'd like to move selected order</p>
                </>
            )}
            {percenting.length > 0 && (
                <>
                    <div className='moving-screen'></div>
                    <p className='moving-msg'>{percenting}</p>
                </>
            )}
        </>
    )
}

export default CreateCheck;


const hasOrder = (orders, item) => {
    var val = false;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].name === item.name) {
            val = true;;
        }
    }
    return val;
}

const ordersToNames = (orders) => {
    var newArr = [];
    orders.forEach((order) => {
        newArr.push(order.name);
    })
    return newArr;
}

const checkIfContains = (guestIndex, guestIndeces) => {    
    var val = false;
    for (let i = 0; i < guestIndeces.length; i++) {
        if (guestIndeces[i] === guestIndex) {
            val = true;;
        }
    }
    return val;
}