function copyObject(object){
    return JSON.parse(JSON.stringify(object));
}


module.exports ={
    copyObject:copyObject,
}