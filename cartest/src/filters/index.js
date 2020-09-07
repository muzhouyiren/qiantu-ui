import Vue from 'vue'

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

Vue.filter('YMDhms', function (date) {

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute, second].map(formatNumber).join(":")

})

Vue.filter('Y.M.D', function (val) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('.');
})


function Emonth(num) {
    switch (num) {
        case 1:
            return "January";
            break;
        case 2:
            return "February";
            break;
        case 3:
            return "March";
            break;
        case 4:
            return "April";
            break;
        case 5:
            return "May";
            break;
        case 6:
            return "June";
            break;
        case 7:
            return "July";
            break;
        case 8:
            return "Aguest";
            break;
        case 9:
            return "September";
            break;
        case 10:
            return "October";
            break;
        case 11:
            return "November";
            break;
        case 12:
            return "December";
            break;
    }
}
Vue.filter('eMD', function () {
    let value = new Date();
    let month = value.getMonth() + 1;
    let emonth = Emonth(month);
    let day = formatNumber(value.getDate());
    return `${emonth} ${day}`;
})