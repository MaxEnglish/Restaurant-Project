export default class Guest {

    constructor() {
        //indeces of orders and amounts corrospond
        //amount default value is one
        this.orders = [];
        this.amounts = [];
        this.specialRequests = '';
    }

    getOrders () {
        return this.orders;
    }

    getAmounts () {
        return this.amounts;
    }

    getSpecialRequests () {
        return this.specialRequests;
    }
    
    addOrder (order) {
        this.orders.push(order);
        this.amounts.push(1);
    }

    changeAmount (amount, order) {
        this.amounts[this.orders.indexOf(order)] = amount;

    }

    removeOrder (order) {
        var index = this.orders.indexOf(order)
        this.orders.splice(index, 1);
        this.amounts.splice(index, 1);
    }
}
