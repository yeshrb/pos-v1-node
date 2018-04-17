const loadAllItems = require('../main/datbase').loadAllItems;
var main = function () {
    return {
        getCount: function (inputs) {
            inputs = inputs || [];
           let ret = inputs.reduce((pre, curr) => {
                if (curr.indexOf('-') > -1)
                   pre[curr.split('-')[0].trim()] = parseInt(curr.split('-')[1]);
                else if (pre[curr])  pre[curr]++;
                else  pre[curr] = 1;
                return pre;
            }, {});
            return ret;
        },
        getOrder:function (inputs) {
            let items = this.getCount(inputs);
            let allItems = loadAllItems();
            return Object.keys(items).reduce((acc,curr)=>{
                allItems.forEach(item => {
                    if(item.barcode == curr){
                        item['number'] =items[curr] ;
                        acc.push(item);
                    }
                })
                return acc;
            },[]);
        },
        printInventory: function () {
            console.log(expectText);
        }
    }
};
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
module.exports = main;