/*
*解析url参数
*@解析url参数example ?id=12345&a=b
*@return Object {id:12345, a:b}
 */

export function urlParse() {
    // 拿到字符串?id=12345&a=b
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            // decodeURIComponent() 对编码后的 URI 进行解码，在这里考虑的多一层
            // 编码：http%3A%2F%2Fwww.w3school.com.cn%2FMy%20first%2F
            // 解码：http://www.w3school.com.cn/My first/
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};
