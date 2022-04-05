const $ = require('../utils/request_util')

// 根据实体类 list插入
const insertByEntityList = function (candidateOpenid,list) {
    return $.request({
        url: '/candidate-for-category/add?candidateOpenid=' + candidateOpenid,
        data: list,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
};

const loadListByCandidateOpenid = function (candidateOpenid){
    return $.request({
        url: '/candidate-for-category/listByCandidateOpenid?candidateOpenid=' + candidateOpenid,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}


module.exports = {
    insertByEntityList: insertByEntityList,
    loadListByCandidateOpenid: loadListByCandidateOpenid,
}