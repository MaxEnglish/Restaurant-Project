import React from 'react';
import { useState, useEffect } from 'react';
import Table from '../components/table';
import '../css/take-order.css';
import MenuItem from '../components/menu-item';
import HomeButton from '../components/home-button';
import OrderItem from '../components/order-item'; 
import TableProfile from '../FEconstructors/TableProfile';
import GuestProfile from '../components/guest-profile';
var API = require('../Controllers');

function TakeOrder() {

    const getMenu = () => {
        API.getMenu().then(
            response => response.json()).then(
            data => {
                setFilteredMenu(data);
                setMenu(data);
            })
    }

    useEffect(() => {
        getMenu();
    }, []);

    const numOfTables = 12;
    const tables = initializeTables(numOfTables);

    const [table, setTable] = useState();
    const [guestIndex, setGuestIndex] = useState(0);
    const [tab, setTab] = useState('tables');
    const [menu, setMenu] = useState([]);    //static
    const [filteredMenu, setFilteredMenu] = useState([]);   //dynamic

    const sendToOrders = (newTable) => {
        console.log(newTable)
        newTable.addGuest();
        setTable(newTable);

        setTab('orders');
    }
     
    return (
        <>
            <HomeButton tab={tab}/>
            {tab === "tables" && (
                <div className='tables-container'>
                    {tables.map((myTable,index) => (
                        <Table key={index}
                        name={myTable}
                        onClick={()=>{
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
                            onChange= {(newVal)=> {     //when searchbar has input, it will filter the results
                                var items = searchFunc(newVal.target.value,menu);
                                setFilteredMenu(items);
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
                                onClick={()=> {
                                    setFilteredMenu(filteredMenu.filter(food => food !== menuItem));
                                    setMenu(filteredMenu.filter(food => food !== menuItem));
                                    document.getElementById('search').value = '';
                                    var temp = table;
                                    temp.addToOrder(guestIndex, menuItem);
                                    setTable(temp);
                                }}
                                />
                            ))}
                        </div>
                        <div className='order-display'>
                            <div className='order-header'>Order</div>
                            {table.showGuestOrder(guestIndex).map((foodItem, index) => (
                                <OrderItem key={index} 
                                name={foodItem.name}
                                sides={foodItem.sides}
                                onChange={(newVal)=> {
                                    console.log(newVal.target.value)
                                }}
                                onClick={()=> {
                                    var temp1 = filteredMenu;
                                    temp1.push(foodItem)
                                    setFilteredMenu(temp1);
                                    setMenu(temp1);
                                    
                                    var temp2 = table;
                                    temp2.removeFromOrder(guestIndex, foodItem);
                                    setTable(temp2);
                                }}
                                />
                                
                            ))}
                        </div>
                    </div>
                    <button
                        className="review-button"
                        onClick={() => {
                            getMenu();
                            if (table.showGuestOrder(guestIndex).length < 1) {
                                table.removeGuest(guestIndex)
                            } else if (guestIndex !== 0) {
                                setGuestIndex(guestIndex - 1);
                            }
                            setTab("review")
                        }}
                    >
                        Review Orders
                    </button>
                    <button
                        className='new-customer-button'
                        onClick={() => {
                            getMenu();

                            var guestCount = table.numOfGuests();    var guestCount = table.numOfGuests();
                            if (guestCount - 1 >= guestIndex) {
                                setGuestIndex(guestCount)
                            } else {
                                setGuestIndex(guestIndex + 1);
                            }   
                            if (guestCount - 1 === guestIndex) {
                                setGuestIndex(guestIndex + 1)
                            } else {
                                setGuestIndex(guestCount);
                            }

                            var temp1 = table;
                            temp1.addGuest();
                            setTable(temp1);
                            
                        }}
                    >
                        + New Guest
                    </button>
                    <button /*onClick={()=>{</>makePost(currentTable)}}*/>Click Me</button>
                </div>
            )}
            {tab === "review" && (
                <div className='review-container'>
                    <div className='inner-container'>
                        {table.orderToString().map((order, index) => (
                            <GuestProfile key={index} 
                            orders={order} 
                            specialRequests={table.showGuestSpecialRequests(index)}
                            onClick={()=> {
                                getMenu();
                                setGuestIndex(index);
                                setTab('orders');
                            }}/>
                            ))
                        }   
                    </div>
                    <button 
                    className='review-button' 
                    onClick={()=> {
                        if(table.numOfGuests() === 0) {
                            table.addGuest();
                        }
                        setTab('orders');
                    }}
                    >Previous Customer
                    </button>
                    <button className='new-customer-button' onClick={()=> {}}>Submit Order</button>
                </div>
            )}
        </>
    )
}

export default TakeOrder;


const searchFunc = (newVal, menu) => {      //returns all items on menu that have characters in common with newVal
    var filteredMenu = [];
    for (let i = 0; i < menu.length; i++) {
        newVal = newVal.toLowerCase();
        var name = menu[i].name.toLowerCase();

        if (name.includes(newVal)){
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

///////





