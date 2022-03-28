const $ = require('../utils/request_util')


const loadEntityById = function(id){
    return $.request({
			url: '/user-recruiter/info?id=' + id,
			data: {},
			method: $.RequestMethod.GET,
			header: $.jsonHeader,
		});
}
 
module.exports = {
    loadEntityById:loadEntityById,
}