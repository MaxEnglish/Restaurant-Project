import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import '../css/take-order.css';
import Table from '../components/table';
import MenuItem from '../components/menu-item';
import HomeButton from '../components/home-button';
import OrderItem from '../components/order-item';
import TableProfile from '../FEconstructors/TableProfile';
import GuestProfile from '../components/guest-profile';
import InputForm from '../components/input-form'
var API = require('../Controllers');

function TakeOrder() {

    const getMenu = () => {
        API.getMenu().then(
            response => response.json()).then(
                data => {
                    setFilteredMenu(data);
                    setDisplayMenu(data);
                })
    }

    const getNumOfTables = () => {
        API.getNumOfTables().then(
            response => response.json()).then(
                data => {
                    setTables(initializeTables(data))
                })
    }

    const sendTable = (data) => {
        API.addTable(JSON.stringify(data));
    }

    useEffect(() => {
        getNumOfTables();
    }, [])

    const [tables, setTables] = useState([]);    //corrosponds table elements, not TableProfiles

    const [table, setTable] = useState();   //the current table being modified
    const [guestIndex, setGuestIndex] = useState(0);    //corrosponds to guest that am currently servin
    const [tab, setTab] = useState('tables');

    const [specialReq, setSpecialReq] = useState(false);    //boolean show special requests input field
    const [confirm, setConfirm] = useState(false);

    const [displayMenu, setDisplayMenu] = useState([]);    //static
    const [filteredMenu, setFilteredMenu] = useState([]);   //dynamic
    const [, forceUpdate] = useReducer(x => x + 1, 0);  //forces the rerendering of an element

    const sendToOrders = (newTable) => {    //uses newly created TableProfile object and assigns is to the table state
        getMenu();
        newTable.addGuest();
        setTable(newTable);
        setTab('orders');
    }

    return (
        <>
            <HomeButton tab={tab} onClick={() => { setConfirm(true) }} />
            {confirm && (
                <>
                    <div className='outside-container'></div>
                    <div className='buttons-wrapper'>
                        <div>Are you sure you want to go home? This order will not be saved</div>
                        <Link to="/">
                            <button className='yes-button'>Yes</button>
                        </Link>
                        <button className='no-button' onClick={() => { setConfirm(false) }}>No</button>
                    </div>
                </>
            )}
            {specialReq && (
                <InputForm
                    value={table.showGuestSpecialRequests(guestIndex)}
                    onClick={() => {
                        setSpecialReq(false);
                    }}
                    onChange={(newVal) => {
                        table.updateSpecialRequests(newVal.target.value, guestIndex);
                    }}
                />
            )}
            {tab === "tables" && (
                <div className='tables-container'>
                    {tables.map((myTable, index) => (    //maps through tables constant and creates numbered table elements
                        <Table key={index}
                            name={myTable}
                            onClick={() => {
                                sendToOrders(new TableProfile(index));
                            }}
                        />
                    ))}
                </div>
            )}
            {tab === "orders" && (
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
                                <div className='right-header'>Sides</div>
                            </div>
                            {filteredMenu.map((menuItem, index) => (    //displaying the filtered results
                                <MenuItem key={index}
                                    name={menuItem.name}
                                    sides={menuItem.sides}
                                    onClick={() => {
                                        if (checkIfOrderExists(menuItem, table.showGuestOrder(guestIndex))) {
                                            console.log("Order already exists")
                                        } else {
                                            document.getElementById('search').value = '';
                                            setTable(table.addToOrder(guestIndex, menuItem));   //update table to include the guest's new order
                                            forceUpdate();
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <div className='order-display'>
                            <div className='order-header'>Order</div>
                            {table.showGuestOrder(guestIndex).map((foodItem, index) => (    //maps the current guest's orders
                                <OrderItem key={index}
                                    name={foodItem.name}
                                    sides={foodItem.sides}
                                    value={table.getOrderAmount(guestIndex, foodItem)}
                                    onChange={(newVal) => {      //triggers when the amount is changed
                                        setTable(table.setOrderAmount(guestIndex, foodItem, newVal.target.value));
                                    }}
                                    onClick={() => {     //triggers when delete button is pressed
                                        setTable(table.removeFromOrder(guestIndex, foodItem));  //updates the table to reflect the item having been deleted
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
                            if (table.showGuestOrder(guestIndex).length < 1 && table.showGuestSpecialRequests(guestIndex).length < 1) {  //handling for if an empty guest has been created
                                setTable(table.removeGuest(guestIndex));
                                setGuestIndex(guestIndex - 1);
                            }
                            if (guestIndex < 0) {     //handling the updating of the guestIndex state
                                setGuestIndex(0);
                            }
                            setTab("review");
                        }}
                    >
                        Review Orders
                    </button>
                    <button
                        className='new-customer-button'
                        onClick={() => {
                            var guestCount = table.numOfGuests();
                            if (guestCount - 1 >= guestIndex) {     //handling for guestIndex state
                                setGuestIndex(guestCount)
                            } else {
                                setGuestIndex(guestIndex + 1);
                            }
                            if (guestCount - 1 === guestIndex) {
                                setGuestIndex(guestIndex + 1)
                            } else {
                                setGuestIndex(guestCount);
                            }
                            setTable(table.addGuest());
                        }}
                    >
                        + New Guest
                    </button>
                </div>
            )}
            {tab === "review" && (
                <div className='review-container'>
                    <div className='inner-container'>
                        {table.orderToString().map((order, index) => (      //mapping the table's guests
                            <GuestProfile key={index}
                                orders={order}
                                specialRequests={table.showGuestSpecialRequests(index)}
                                onClick={() => {     //redirect to orders tab 
                                    setGuestIndex(index);
                                    setTab('orders');
                                }}
                                onDelete={() => {
                                    setTable(table.removeGuest(index))
                                    setGuestIndex(guestIndex - 1);
                                    forceUpdate();
                                }}
                            />
                        ))
                        }
                    </div>
                    <button
                        className='review-button'
                        onClick={() => {
                            if (table.numOfGuests() === 0) {
                                setTable(table.addGuest());
                                setGuestIndex(0);
                            }
                            setTab('orders');
                        }}
                    >Previous Customer
                    </button>
                    <Link to="/">
                        <button
                            className='new-customer-button'
                            onClick={() => {
                                sendTable(table);
                            }}
                        >Submit Order
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}

export default TakeOrder;

//helper functions

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

const initializeTables = (numofTables) => {
    var arr = [];
    for (let i = 0; i < numofTables; i++) {
        arr.push("Table " + i);
    }
    return arr;
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

///////





