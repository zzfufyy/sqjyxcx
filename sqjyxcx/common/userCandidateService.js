const $ = require('../utils/request_util')


const loadEntityById = function(id){
    return $.request({
			url: '/user-candidate/info?openid=' + openid,
			data: {},
			method: $.RequestMethod.GET,
			header: $.jsonHeader,
		});
}
 
module.exports = {
    loadEntityById:loadEntityById,
}