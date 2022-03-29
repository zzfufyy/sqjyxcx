function dateToCN(datetime){
    let time = new Date(datetime);
    return time.getFullYear() + "年" + (time.getMonth()+1) + "月" + time.getDate() + "日";
}

function getAgeByBirthday(datetime){
    let time = new Date(datetime);
    let nowtime = new Date();
    return nowtime.getFullYear() - time.getFullYear();
}


module.exports ={
    dateToCN:dateToCN,
    getAgeByBirthday:getAgeByBirthday,
    
}