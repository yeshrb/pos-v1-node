const Pos = require('../main/main');
const test_order = require('./test-data');

describe('pos', function () {
    let _pos;
    beforeEach(() => {
        _pos = Pos(test_order);
    });


    it('should build correct order list', function () {
        let expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n';

        expect(_pos.buildOrderList()).toEqual(expectText);
    });

    it('should build correct promotion infoemation', function () {
        let expectText =
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n';

        expect(_pos.buildPromotionInformation()).toEqual(expectText);
    });

    it('should build correct totalSummary infoemation', function () {
        let expectText =
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(_pos.buildSummaryInfomation()).toEqual(expectText);
    });


    it('should print correct text', function () {
        spyOn(console, 'log');
        _pos.printInventory();
        let expectText =
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
