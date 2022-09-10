import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import '../css/universal.css';
import HomeButton from '../components/home-button';
import Table from '../components/table'
import GuestProfile from '../components/guest-profile';
import MenuItem from '../components/menu-item'
import OrderItem from '../components/order-item'
import InputForm from '../components/input-form'
import { FaSadTear } from 'react-icons/fa'
var API = require('../Controllers');

function ManageTables() {

    const [tables, setTables] = useState([]);
    const [table, setTable] = useState();
    const [confirm, setConfirm] = useState(false);
    const [tab, setTab] = useState('tables');
    const [guestIndex, setGuestIndex] = useState();

    const [displayMenu, setDisplayMenu] = useState([]);    //static
    const [filteredMenu, setFilteredMenu] = useState([]);   //dynamic
    const [specialReq, setSpecialReq] = useState(false);    //boolean show special requests input field

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const getTables = () => {
        API.getTables().then(
            response => response.json()).then(
                data => {
                    setTables(data);
                    getMenu();
                })
    }

    const replaceTable = (data) => {
        API.replaceTable(JSON.stringify(data));
    }

    const getMenu = () => {
        API.getMenu().then(
            response => response.json()).then(
                data => {
                    setFilteredMenu(data);
                    setDisplayMenu(data);
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
                        <div>Are you sure you want to go home? Your order edits will not be saved</div>
                        <Link to="/">
                            <button className='yes-button'>Yes</button>
                        </Link>
                        <button className='no-button' onClick={() => { setConfirm(false) }}>No</button>
                    </div>
                </>
            )}

            {specialReq && (
                <InputForm
                    value={table.guests[guestIndex].specialRequests}
                    onClick={() => {
                        setSpecialReq(false);
                    }}
                    onChange={(newVal) => {
                        let tempTable = table;
                        tempTable.guests[guestIndex].specialRequests = newVal.target.value;
                        setTable(tempTable);
                    }}
                />
            )}

            {tab === 'tables' ? (
                tables.length === 0 ? (
                    <div className='no-orders'>There are currently no tables to manage <FaSadTear /> To add a new table, go to "Take Order" on the Home page</div>
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
                                    tempTable.guests.splice(index, 1);
                                    setTable(tempTable)
                                    forceUpdate();
                                }}
                            />
                        ))}
                    </div>
                    <Link to="/">
                        <button
                            className='new-customer-button'
                            onClick={() => {
                                replaceTable(table);
                            }}
                        >Save Changes
                        </button>
                    </Link>

                    <button
                        className="review-button"
                        onClick={() => {
                            var tempTable = table;
                            tempTable.guests.splice(0, table.guests.length);
                            setTable(tempTable)
                            forceUpdate();
                        }}
                    >Clear Table
                    </button>
                </div>
            )}

            {tab === 'orders' && (
                <div className='main-container'>
                    <div className='header'>Table {table.name}</div>
                    <div className='container'>
                        <div className='menu-items'>
                            <input
                                id="search"
                                className="searchbar"
                                onChange={(newVal) => {     //when searchbar has input, it will filter the results
                                    setFilteredMenu(searchFunc(newVal.target.value, displayMenu));
                                }}
                            ></input>

                            <div className='menu-header'>
                                <div className='left-header'>Dish</div>
                                <div className='right-header'>Price</div>
                            </div>
                            {filteredMenu.map((menuItem, index) => (    //displaying the filtered results
                                <MenuItem key={index}
                                    name={menuItem.name}
                                    sides={menuItem.sides}
                                    price={"$" + menuItem.price}
                                    onClick={() => {
                                        if (checkIfOrderExists(menuItem, table.guests[guestIndex].orders)) {
                                            console.log("Order already exists")
                                        } else {
                                            document.getElementById('search').value = '';
                                            var thisTable = table;
                                            thisTable.guests[guestIndex].orders.push(menuItem);
                                            thisTable.guests[guestIndex].amounts.push(1);
                                            setTable(thisTable);   //update table to include the guest's new order
                                            forceUpdate();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <div className='order-display'>
                            <div className='order-header'>Order</div>
                            {table.guests[guestIndex].orders.map((foodItem, index) => (    //maps the current guest's orders
                                <OrderItem key={index}
                                    name={foodItem.name}
                                    sides={foodItem.sides}
                                    value={table.guests[guestIndex].amounts[index]}
                                    onChange={(newVal) => {      //triggers when the amount is changed
                                        var tempTable = table;
                                        tempTable.guests[guestIndex].amounts.splice(index, 1, newVal.target.value)
                                        setTable(tempTable);
                                    }}
                                    onClick={() => {     //triggers when delete button is pressed
                                        var thisTable = table;;
                                        thisTable.guests[guestIndex].orders.splice(index, 1);
                                        thisTable.guests[guestIndex].amounts.splice(index, 1);
                                        setTable(thisTable);  //updates the table to reflect the item having been deleted
                                        forceUpdate();
                                    }}
                                />

                            ))}
                        </div>
                    </div>
                    <button
                        className='special-req-button'
                        onClick={() => {
                            setSpecialReq(true);
                        }}
                    >Add Special Request
                    </button>
                    <button
                        className="review-button"
                        onClick={() => {
                            if (table.guests[guestIndex].orders.length < 1 && table.guests[guestIndex].specialRequests.length < 1) {  //handling for if an empty guest has been created
                                let tempTable = table;
                                tempTable.guests.splice(guestIndex, 1);
                                setTable(tempTable);
                                setGuestIndex(guestIndex - 1);
                            } else if (table.guests[guestIndex].specialRequests.length < 1) {

                            }
                            if (guestIndex < 0) {     //handling the updating of the guestIndex state
                                setGuestIndex(0);
                            }
                            setTab("review");
                        }}
                    >
                        Review Orders
                    </button>
                </div>
            )}
        </>
    )
}


export default ManageTables;

const ordersToString = (orders) => {
    if (orders.length > 0) {
        var ordersString = [orders[0].name];
        if (orders.length > 1) {
            for (var i = 1; i < orders.length; i++) {
                ordersString.push(" " + orders[i].name);
            }
        }
    }
    return ordersString;
}

const searchFunc = (newVal, menu) => {      //returns all items on menu that have characters in common with newVal
    var filteredMenu = [];
    for (let i = 0; i < menu.length; i++) {
        newVal = newVal.toLowerCase();
        var name = menu[i].name.toLowerCase();

        if (name.includes(newVal)) {
            filteredMenu.push(menu[i]);
        }
    }
    return filteredMenu;
}

const checkIfOrderExists = (order, orders) => {
    let count = 0;
    let exists = false;
    while (count < orders.length && !exists) {
        if (order.name === orders[count].name) {
            exists = true;
        }
        count++;
    }
    return exists;
}