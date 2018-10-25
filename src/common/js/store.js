/* id:商家的id key:存储不同字段key */
/* 想构造一个这样的对象：
*seller = {
*"id1": {"key": "value1"},
*"id2": {"key": "value2"}
*}
*思路：构造一个存取对象seller
*A.存储：
*1.定义一个seller
*2.判断seller字符串是否存在，如果存在，将字符串转为json对象，然后将value赋值给对象（存储起来）
*3.如果不存在，构造这个对象，然后将value存储进对象
*4.将seller对象转换成字符串并存储进localStorage__seller__中
*
* B.读取：
* 1.判断seller是否存在，如果存在，将seller里面的value返回
* 2.如果不存在，则返回seller里面的默认value
 */
export function saveToLocal(id, key, value) {
    let seller = window.localStorage.__seller__;
    /* 如果没有__seller__这个东西 */
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        /* 反则，用JSON.parse() 方法用于将一个 JSON 字符串转换为对象。 */
        seller = JSON.parse(seller);
        // 再判断里面的id是否为空
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    // 把seller装换成字符串存入__seller__中
    window.localStorage.__seller__ = JSON.stringify(seller);
};

/* 读取，def表示默认值 */
export function loadFromLocal(id, key, def) {
    let seller = window.localStorage.__seller__;
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }
    let ret = seller[key];
    return ret || def;
}
