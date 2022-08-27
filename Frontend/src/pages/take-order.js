import React from 'react';
import { useState, useEffect, useReducer } from 'react';
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
            setDisplayMenu(data);
        })
    }

    useEffect(() => {
        getMenu();
    }, []);

    const numOfTables = 12;
    const tables = initializeTables(numOfTables);

    const [table, setTable] = useState();  
    const [guestIndex, setGuestIndex] = useState(0);    //corrosponds to guest that am currently servin
    const [tab, setTab] = useState('tables');
    
    const [displayMenu, setDisplayMenu] = useState([]);    //static
    const [filteredMenu, setFilteredMenu] = useState([]);   //dynamic
    const [, forceUpdate] = useReducer(x => x + 1, 0);  //forces the rerendering of an element

    const sendToOrders = (newTable) => {    //uses newly created TableProfile object and assigns is to the table state
        newTable.addGuest();
        setTable(newTable);
        setTab('orders');
    }
     
    return (
        <>
            <HomeButton tab={tab}/>
            {tab === "tables" && (
                <div className='tables-container'>
                    {tables.map((myTable,index) => (    //maps through tables constant and creates numbered table elements
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
                                var items = searchFunc(newVal.target.value,displayMenu);
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
                                    setFilteredMenu(filteredMenu.filter(food => food !== menuItem));    //remove selected item from menu to show it's been selected
                                    setDisplayMenu(filteredMenu.filter(food => food !== menuItem));
                                    document.getElementById('search').value = '';
                                    let temp = table;
                                    temp.addToOrder(guestIndex, menuItem);  //update table to include the guest's new order
                                    setTable(temp);
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
                                value={table.getOrderAmount(guestIndex,foodItem)}   
                                onChange={(newVal)=> {      //triggers when the amount is changed
                                    table.setOrderAmount(guestIndex,foodItem,newVal);   
                                }}
                                onClick={()=> {     //triggers when delete button is pressed
                                    if (!checkIfIncludes(filteredMenu, foodItem)){ 
                                        let temp1 = filteredMenu;   //reupdates the menu to include the delete item
                                        temp1.push(foodItem)
                                        setFilteredMenu(temp1);
                                        setDisplayMenu(temp1);
                                    }

                                    let temp2 = table;
                                    temp2.removeFromOrder(guestIndex, foodItem);    //updates the table to reflect the item having been deleted
                                    setTable(temp2);
                                    forceUpdate();
                                }}
                                />
                                
                            ))}
                        </div>
                    </div>
                    <button
                        className="review-button"
                        onClick={() => {
                            if (table.showGuestOrder(guestIndex).length < 1) {  //handling for if an empty guest has been created
                                table.removeGuest(guestIndex);
                                setGuestIndex(guestIndex - 1);
                            }
                            if (guestIndex < 0) {     //handling the updating of the guestIndex state
                                console.log("trigger1")
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
                            console.log("trigger2")
                            getMenu();
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

                            var temp1 = table;
                            temp1.addGuest();
                            setTable(temp1);
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
                            onClick={()=> {     //redirect to orders tab 
                                getMenu();
                                console.log("trigger3")
                                setGuestIndex(index);
                                setTab('orders');
                            }}
                            onSelect={()=>{
                                let tempTable = table;
                                tempTable.removeGuest(index);
                                setTable(tempTable);
                                console.log("trigger4")
                                setGuestIndex(guestIndex - 1);
                                forceUpdate();
                                //console.log(guestIndex);
                                //console.log(table.showGuestOrder(guestIndex));
                                
                                
                            }}
                            />
                            ))
                        }   
                    </div>
                    <button 
                    className='review-button' 
                    onClick={()=> {
                        console.log(table.getGuests())
                        if(table.numOfGuests() === 0) {
                            getMenu();
                            let tempTable = table;
                            tempTable.addGuest();
                            setTable(tempTable);
                            setGuestIndex(0);
                        }
                        //console.log(guestIndex)
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

const checkIfIncludes = (menu,order) => {
    let count = 0;
    let done = false;
    while (count < menu.length && !done) {
        if (menu[count].name === order.name){
            done = true;
        }
        count++;
    }
    return done;
}

const shiftGuests = (table, removedIndex) => {

}

///////





