const $ = require('../utils/request_util')


const loadEntityById = function (id) {
    return $.request({
        url: '/recruit-company/info?id=' + id,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader
    })
}

const updateRecruitCompany = function( recruitCompany){
    return $.request({
        url: '/recruit-company/modify',
        data: recruitCompany,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}


module.exports = {
    loadEntityById: loadEntityById,
    updateRecruitCompany: updateRecruitCompany,
}