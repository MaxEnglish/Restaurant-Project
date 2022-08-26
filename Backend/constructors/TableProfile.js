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
        return this.guests.push(new Guest());
    }

    removeGuest (guestIndex) {
        this.guests.splice(guestIndex, 1);
    }

    addToOrder (guestIndex, order) {
        this.guests[guestIndex].addOrder(order);
    }

    removeFromOrder (guestIndex, order) {
        this.guests[guestIndex].removeOrder(order);
    }

    showGuestOrder (guestIndex) {
        return this.guests[guestIndex].getOrders();
    }

    showGuestSpecialRequests (guestIndex) {
        return this.guests[guestIndex].getSpecialRequests();
    }

    clearTable () {
        this.setGuests([]);
    }
}