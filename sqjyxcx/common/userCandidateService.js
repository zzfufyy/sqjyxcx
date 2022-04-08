const $ = require('../utils/request_util')


const insertByEntity = function (insertData) {
    return $.request({
        url: '/user-candidate/add',
        data: insertData,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}


const loadEntityById = function (openid) {
    return $.request({
        url: '/user-candidate/info?openid=' + openid,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}

const updateByEntity = function (updateData) {
    return $.request({
        url: '/user-candidate/modify',
        data: updateData,
        method: $.RequestMethod.POST,
        header: $.jsonHeader
    });
}

const pagedByDistacne = function (pagingParam) {
    return $.requestOnlyData({
        url: '/user-candidate/paged-by-distance',
        data: pagingParam,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}

const increaseCountView = function (id) {
    return $.request({
        url: '/user-candidate/increaseCountView?id=' + id,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}

const pagedByDistance = function (pagingParam) {
    return $.requestOnlyData({
        url: '/user-candidate/paged-by-distance',
        data: pagingParam,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}

const pagedByDistanceAndSalary = function (categoryName, jobSalaryMin, jobSalaryMax, pagingParam) {
    return $.requestOnlyData({
        url: '/user-candidate/paged-by-distance?categoryName=' + categoryName + '&jobSalaryMin=' + jobSalaryMin + '&jobSalaryMax=' + jobSalaryMax,
        data: pagingParam,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}


module.exports = {
    insertByEntity: insertByEntity,
    loadEntityById: loadEntityById,
    updateByEntity: updateByEntity,
    pagedByDistacne: pagedByDistacne,
    increaseCountView: increaseCountView,
    pagedByDistance: pagedByDistance,
    pagedByDistanceAndSalary: pagedByDistanceAndSalary,
}