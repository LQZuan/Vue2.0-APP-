export function formatDate(date, fmt) {
    // date传入的格式为：Thu Feb 22 2018 11:47:44 GMT+0800 (中国标准时间)
    // fmt传入的格式为：yyyy-MM-dd hh:mm
    // RegExp.$1表示匹配到的yyyy
    if (/(y+)/.test(fmt)) {
        // replace将后面的值替换掉yyyy
        // 这里的date.getFullYear()是数字类型，后面+''是为了将其装换为字符串。而后面的substr是考虑到其他格式比如如果只有两个y：yy这种格式的时候，要返回两位数
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        // 到这个位置之后，fmt就成了：2018-MM-dd hh:mm
    };
    /* getMonth()等都是内置的函数，由于Month()比较特殊是从0开始的，所以要+1 */
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            // 转换字符串
            let str = o[k] + '';
            // 三元表达式的意思是：比如如果是只有一个M的格式，那么直接把str赋值给fmt，否则就需要在前面补0
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        };
    };
    return fmt;
};

function padLeftZero(str) {
    // 比如str是9，那么009.substr（1）之后就是09；如果str是11，同理返回值就是11
    return ('00' + str).substr(str.length);
};
