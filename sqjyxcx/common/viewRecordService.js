const $ = require('../utils/request_util')


const loadEntityById = function(id){
    return $.request({
			url: '/view-record/info?id=' + id,
			data: {},
			method: $.RequestMethod.GET,
			header: $.jsonHeader,
		});
}

const insertByEntity = function (insertData) {
    return $.request({
        url: '/view-record/add',
        data: insertData,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    })
}
 
module.exports = {
    loadEntityById:loadEntityById,
    insertByEntity:insertByEntity,
}