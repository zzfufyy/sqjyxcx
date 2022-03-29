const $ = require('../utils/request_util')

const insertByEntity = function (insertData) {
    return $.request({
        url: '/recruit-record/add',
        data: insertData,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    })
}
const loadEntityById = function (id) {
    return $.request({
        url: '/recruit-record/info?id=' + id,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader
    })
}

const listRecordPlusByCandidateOpenid = function(candidateOpenid){
    return $.request({
        url: '/recruit-record/listRecordPlusByCandidateOpenid?candidateOpenid=' + candidateOpenid,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader
    })
}

const listRecordPlusByCompanyUuid = function(companyUuid){
    return $.request({
        url: '/recruit-record/listRecordPlusByCompanyUuid?companyUuid=' + companyUuid,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader
    })
}


module.exports = {
    insertByEntity:insertByEntity,
    loadEntityById:loadEntityById,
    listRecordPlusByCandidateOpenid:listRecordPlusByCandidateOpenid,
    listRecordPlusByCompanyUuid:listRecordPlusByCompanyUuid,
}