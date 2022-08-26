export default class Guest {

    constructor() {
        this.orders = [];
        this.specialRequests = '';
    }

    getOrders () {
        return this.orders;
    }

    getSpecialRequests () {
        return this.specialRequests;
    }
    
    addOrder (order) {
        this.orders.push(order);
    }

    removeOrder (order) {
        var index = this.orders.indexOf(order);
        if (index !== -1) {
            this.orders.splice(index, 1);
        }
    }
}
