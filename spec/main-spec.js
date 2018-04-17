const main = require('../main/main');


describe('pos', function () {
    let  inputs;
    let order;
    beforeEach(function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        order = main(inputs);
    }

    );



    it('shuld sum same item', function () {
        let expt = {ITEM000001: 5, ITEM000003: 2, ITEM000005: 3};

        expect(order.getOrderItems()).toEqual(expt);
    });


    it('should get Order Detail', function () {
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

    it('should not get Order Detail when code not exist in allItems', function () {
        let expt = [{
            barcode: 'ITEM000006',
            name: '',
            unit: '',
            price: '',
            number: 5
        }];
        let inp = ['ITEM000006-5'];
        let odr = main(inp);
        expect(odr.getOrderDetails()).toEqual(expt);
    });

    it('should get promotions', function () {
        let expt = [{barcode: 'ITEM000001', number: 1}, {barcode: 'ITEM000005', number: 1}];
        expect(order.getPromotion(inputs)).toEqual(expt);
    });

    it('should build correct order list', function () {
        let expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n';

        expect(order.buildOrderList(inputs)).toEqual(expectText);
    });

    it('should build correct promotion infoemation', function () {
        let expectText =
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n';

        expect(order.buildPromotionInformation(inputs)).toEqual(expectText);
    });

    it('should build correct totalSummary infoemation', function () {
        let expectText =
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(order.buildSummaryInfomation(inputs)).toEqual(expectText);
    });


    it('should print correct text', function () {

        spyOn(console, 'log');

        order.printInventory(inputs);

        let  expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
