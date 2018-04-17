const loadAllItems = require('../main/datbase').loadAllItems;
const allPromotions = require('../main/datbase').loadPromotions();



const main = function (items) {
    let _order = getOrder(items);
    let _orderItems = getCount(items);
    let _promotions = getPromotions(items);
    return {
        getOrderItems:  () =>  _orderItems,
        getOrderDetails:  ()=> _order,
        getOrderPromotion: ()=>  _promotions,
        buildOrderList:function (inputs) {
            let promotions = this.getOrderPromotion(inputs);
            return _order.reduce((acc,curr) =>{
                let summary = curr.price * curr.number;
                _promotions.forEach(it => {
                    if (it.barcode === curr.barcode)
                        summary = curr.price*(curr.number - it.number);
                });
                acc +=`名称：${curr.name}，数量：${curr.number}${curr.unit}，单价：${curr.price.toFixed(2)}(元)，小计：${summary.toFixed(2)}(元)\n`;
                return acc;
            },'***<没钱赚商店>购物清单***\n' );
        },
        buildPromotionInformation:function (inputs) {
            let promotions = this.getOrderPromotion(inputs);
            let orders = this.getOrderDetails(inputs);

            return promotions.reduce((accu,curr)=> {
                let orderItem = orders.filter((odr)=>{
                    return (odr.barcode === curr.barcode);
                });
                accu += `名称：${orderItem[0].name}，数量：${curr.number}${orderItem[0].unit}\n`;
                return accu;

            },'----------------------\n挥泪赠送商品：\n');

        },
        buildSummaryInfomation:function (inputs) {
            let promotions = this.getOrderPromotion(inputs);
            let orders = this.getOrderDetails(inputs);
            let obj = orders.reduce((accu,curr) =>{
                let currSummary = curr.price * curr.number;
                promotions.forEach(it => {
                    if (it.barcode === curr.barcode){
                        accu.discount += curr.price * it.number;
                        currSummary = curr.price *(curr.number - it.number )
                    }
                });
                accu.sum += currSummary;
                return accu;


            },{sum:0,discount:0});
            return `----------------------\n`+
                `总计：${obj.sum.toFixed(2)}(元)\n`+
                `节省：${obj.discount.toFixed(2)}(元)\n`+
                `**********************`;
        },
        printInventory: function (inputs) {
            let expectText = this.buildOrderList(inputs) +
                             this.buildPromotionInformation(inputs)+
                             this.buildSummaryInfomation(inputs);
            console.log(expectText);
        }
    }
};

function getCount (inputs) {
    inputs = inputs || [];
    return inputs.reduce((pre, curr) => {
        if (curr.indexOf('-') > -1)
            pre[curr.split('-')[0].trim()] = parseInt(curr.split('-')[1]);
        else if (pre[curr]) pre[curr]++;
        else pre[curr] = 1;
        return pre;
    }, {})};
function getOrder(inputs) {
    let items = getCount(inputs);
    let allItems = loadAllItems();
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
};
function getPromotions(inputs) {
    let items = getCount(inputs);
    return Object.keys(items).reduce((accu, curr) => {
        allPromotions.forEach((promotion) => {
            if (promotion.barcodes.indexOf(curr.trim()) > -1 && items[curr] > 2)
                accu.push({barcode: curr, number: 1});
        });
        return accu;
    }, []);
}
module.exports = main;