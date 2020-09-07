export const formser = function (form) {
    var arr = {};
    for (var i = 0; i < form.elements.length; i++) {
        var feled = form.elements[i];
        switch (feled.type) {
            case undefined:
            case 'button':
            case 'file':
            case 'reset':
            case 'submit':
                break;
            case 'checkbox':
            case 'radio':
                if (!feled.checked) {
                    break;
                }
            default:
                if (arr[feled.name]) {
                    arr[feled.name] = arr[feled.name] + ',' + feled.value;
                } else {
                    arr[feled.name] = feled.value;

                }
        }
    }
    return arr
}

export function UrlSearch() {
    let name, value, str = location.href, num = str.indexOf("?"), num1 = str.indexOf("#"); //取得整个地址栏
    str = str.substring(num + 1, num1); //取得所有参数 stringvar.substr(start [, length ]
    let arr = str.split("&"); //各个参数放到数组里
    // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        let equalNum = arr[i].indexOf("=");
        if (equalNum > 0) {
            name = arr[i].substring(0, equalNum);
            value = arr[i].substr(equalNum + 1);
            this[name] = value;
        }
    }
}

export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export const isIE = () => {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}
