const main = require('../main/main')();
const loadAllItems = require('../main/datbase').loadAllItems;

describe('pos', function () {
    var allItems;
    var inputs;
    beforeEach(function () {

        allItems = loadAllItems();
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
    });
    
    it('shuld sum same item' ,function () {
        let expt = {ITEM000001:5,ITEM000003:2,ITEM000005:3};
        expect(main.getCount(inputs)).toEqual(expt);
    });
    it('should get Order Detail',function () {
        let ret = [ {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            number:5
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                number:2
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                number:3
            }
        ];
        expect(main.getOrder(inputs)).toEqual(ret);
    });
    it('should not get Order Detail when code not exist in allItems',function () {
        let expt = [ {
            barcode: 'ITEM000006',
            name:undefined,
            unit: undefined,
            price: undefined,
            number:5
    }];
        let inp = ['ITEM000006-5'];
        expect(main.getOrder(inp)).toEqual(expt);
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        main.printInventory(inputs);

        var expectText =
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
