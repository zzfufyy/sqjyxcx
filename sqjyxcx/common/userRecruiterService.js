const $ = require('../utils/request_util')


const insertByEntity = function (insertData) {
	return $.request({
		url: '/user-recruiter/add',
		data: insertData,
		method: $.RequestMethod.POST,
		header: $.jsonHeader,
	});
}

const loadEntityById = function (id) {
	return $.request({
		url: '/user-recruiter/info?id=' + id,
		data: {},
		method: $.RequestMethod.GET,
		header: $.jsonHeader,
	});
}

module.exports = {
	insertByEntity: insertByEntity,
	loadEntityById: loadEntityById,
}