export default class Guest {

    constructor(name) {
        this.name = name;
        this.orders = [];
        this.specialRequests = [];
    }
    
    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

    addOrder (order, specialRequest = 'NA') {
        this.orders.push(order);
        if (specialRequest !== 'NA') {
            this.specialRequests.push(specialRequest);
        }
    }

    removeOrder (order) {
        this.orders.splice(this.orders.indexOf(order));
    }

}