const Order = require('../main/order');
const order = require('./test-data');
describe('order', function () {

     it('shuld sum same item', function () {
        let expt = {ITEM000001: 5, ITEM000003: 2, ITEM000005: 3};
        expect(order.getOrderItems()).toEqual(expt);
    });

    it('should get order details', function () {
        let ret = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                number: 5
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                number: 2
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                number: 3
            }
        ];
        expect(order.getOrderDetails()).toEqual(ret);
    });

    it('should not get detail when code not exist in allItems', function () {
        let expt = [{
            barcode: 'ITEM000006',
            name: '',
            unit: '',
            price: '',
            number: 5
        }];
        let inp = ['ITEM000006-5'];
        let odr = new Order(inp);
        expect(odr.getOrderDetails()).toEqual(expt);
    });

    it('should get promotions', function () {
        let expt = [{barcode: 'ITEM000001', number: 1}, {barcode: 'ITEM000005', number: 1}];
        expect(order.getOrderPromotion()).toEqual(expt);
    });


});
