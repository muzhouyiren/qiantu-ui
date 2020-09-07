import Vue from 'vue'

function doubleNum(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

Vue.filter('Y.M.D', function (val) {
    let value = new Date(val);
    let year = value.getFullYear();
    let month = doubleNum(value.getMonth() + 1);
    let day = doubleNum(value.getDate());
    return `${year}.${month}.${day}`;
})

Vue.filter('YMDHms',function(val){
    let value = new Date(val);
      let year = value.getFullYear();
      let month = doubleNum(value.getMonth() + 1);
      let day = doubleNum(value.getDate());
      let hour = doubleNum(value.getHours());
      let minutes = doubleNum(value.getMinutes());
      let seconds = doubleNum(value.getSeconds());
      return `${year}-${month}-${day}  ${hour}:${minutes}:${seconds}`;
})

Vue.filter('YMDNhm',function(val){
    let value = new Date(val*1);
    let year = value.getFullYear();
    let month = value.getMonth()+1;
    let day = value.getDate();
    let hour = doubleNum(value.getHours());
    let minutes = doubleNum(value.getMinutes());
    let noon = ""
    if(hour>12){
        noon = "下午"
    }else{
        noon = "上午"
    }
    return `${year}年${month}月${day}日  ${noon}${hour}:${minutes}`;
})


function Emonth(num){
    switch(num){
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
Vue.filter('eMD',function(){
    let value = new Date();
    let month = value.getMonth()+1;
    let emonth = Emonth(month);
    let day = doubleNum(value.getDate());
    return `${emonth} ${day}`;
})