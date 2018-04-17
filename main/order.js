const allItems = require('../main/datbase').loadAllItems();
const allPromotions = require('../main/datbase').loadPromotions();

const order = class Order {
    constructor(selected) {
        this._orderItems = getCount(selected);
        this._orderDetails = getOrder(this._orderItems);
        this._promotions = getPromotions(this._orderItems);
    }

    getOrderItems() {
        return this._orderItems;
    }

    getOrderDetails() {
        return this._orderDetails
    }

    getOrderPromotion() {
        return this._promotions
    }

};

let getCount = (inputs) => {
    inputs = inputs || [];
    return inputs.reduce((pre, curr) => {
        if (curr.indexOf('-') > -1)
            pre[curr.split('-')[0].trim()] = parseInt(curr.split('-')[1]);
        else if (pre[curr]) pre[curr]++;
        else pre[curr] = 1;
        return pre;
    }, {});
};

let getOrder = (items)=> {
    return Object.keys(items).reduce((acc, curr) => {
        let orderItem = {barcode: curr, number: items[curr], name: '', unit: '', price: ''};
        allItems.forEach(item => {
            if (item.barcode === orderItem.barcode) {
                orderItem.name = item.name;
                orderItem.unit = item.unit;
                orderItem.price = item.price;
            }
        });
        acc.push(orderItem);
        return acc;
    }, []);
}


let  getPromotions = (items)=>{
    return Object.keys(items).reduce((accu, curr) => {
        allPromotions.forEach((promotion) => {
            if (promotion.barcodes.indexOf(curr.trim()) > -1 && items[curr] > 2)
                accu.push({barcode: curr, number: 1});
        });
        return accu;
    }, []);
};
module.exports = order;