import { TiThSmall } from 'react-icons/ti';
import Guest from './Guest'

export default class TableProfile {
    constructor(name){
        this.name = name;
        this.guests = [];
    }

    getName () {
        return this.name;
    }

    getGuests () {
        return this.guests;
    }

    setGuests (guestArray) {
        this.guests = guestArray;
    }

    numOfGuests () {
        return this.guests.length;
    }

    addGuest () {
       this.guests.push(new Guest());
       return this;
    }

    removeGuest (guestIndex) {
        this.guests.splice(guestIndex, 1);
        return this;
    }

    addToOrder (guestIndex, order) {
        this.guests[guestIndex].addOrder(order);
        return this;
    }

    removeFromOrder (guestIndex, order) {
        this.guests[guestIndex].removeOrder(order);
        return this;
    }

    showGuestOrder (guestIndex) {
        return this.guests[guestIndex].getOrders();
    }

    showGuestSpecialRequests (guestIndex) {
        return this.guests[guestIndex].getSpecialRequests();
    }

    updateSpecialRequests (request, guestIndex) {
        this.guests[guestIndex].setSpecialRequests(request);
    }

    clearTable () {
        this.setGuests([]);
    }

    getOrderAmount (guestIndex, order) {
        var guest = this.guests[guestIndex];
        return guest.getAmounts()[guest.getOrders().indexOf(order)];
    }

    setOrderAmount (guestIndex, order, newAmount) {
        this.guests[guestIndex].changeAmount(newAmount,order);
        return this;
    }

    orderToString () {
        var allOrders = [];
        this.guests.forEach((guest) => {
            var guestOrder = '';
            var temp = guest.orders;
            if (temp.length > 0) {
                for(let i = 0; i < temp.length - 1; i++) {
                    guestOrder += temp[i].name + ", ";
                }
                guestOrder += temp[temp.length - 1].name;
                allOrders.push(guestOrder);
            } else if (guest.specialRequests.length > 0) {
                allOrders.push("N/A")
            }
        })
        return allOrders;
    }
}

