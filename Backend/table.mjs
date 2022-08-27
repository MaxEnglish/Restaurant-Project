import Guest from './guest.mjs'

export default class Table {
    constructor(name){
        this.name = name;
        this.guests = [];
    }

    addGuest () {
        this.guests.push(new Guest(this.guests.length));
    }

    takeOrder (order, specialRequest, guestIndex) {
        guests[guestIndex].addOrder(order, specialRequest);
    }

    changeOrder (order, guestIndex) {
        guests[guestIndex].removeOrder(order);
    }

}