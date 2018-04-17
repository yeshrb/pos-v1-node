
const main = function (order) {
    let _order = order.getOrderDetails();
    let _promotions=order.getOrderPromotion();
    return {
        buildOrderList:function () {
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
            return _promotions.reduce((accu,curr)=> {
                let orderItem = _order.filter((odr)=>{
                    return (odr.barcode === curr.barcode);
                });
                accu += `名称：${orderItem[0].name}，数量：${curr.number}${orderItem[0].unit}\n`;
                return accu;

            },'----------------------\n挥泪赠送商品：\n');

        },
        buildSummaryInfomation:function (inputs) {
            let obj = _order.reduce((accu,curr) =>{
                let currSummary = curr.price * curr.number;
                _promotions.forEach(it => {
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


module.exports = main;