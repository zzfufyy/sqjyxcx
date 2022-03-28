
const _app = getApp();
const basePath = _app.globalData.web_path;

function request(params) {
    console.debug(`Request ${params.url} with data: `);
    console.debug(params.data);

    params.url = basePath + params.url;
    console.debug(`Change param.url to ${params.url}`);

    return new Promise(
        function (resolve, reject) {
            wx.request({
                ...params,
                success: function (r) {
                    console.debug(`Request ${params.url} get response: `);
                    console.debug(r);
                    if (r.statusCode == 200 && r.data && r.data.code == 0 && r.data) {
                        resolve(r.data);
                    } else {
                        reject(r);
                    }
                },
                fail: function (error) {
                    console.error(`Request ${params.url} Failed`);
                    reject(error);
                },
            });
        }
    );
}

function upload(params) {
    console.debug(`Request ${params.url} with data: `);
    console.debug(params.data);
    params.url = basePath + params.url;
    console.debug(`Change param.url to ${params.url}`);
    return new Promise(
        function (resolve, reject) {
            wx.uploadFile({
                ...params,
                success: function (r) {
                    console.debug(`Upload ${params.url} get response: `);
                    console.debug(r);

                    if (r.statusCode == 200) {

                        resolve(r.data);
                    } else {
                        reject(r);
                    }
                },
                fail: function (error) {
                    console.error(`Upload ${params.url} Failed`);
                    reject(error);
                },
            });
        }
    );
}
const requestOnlyData = (params) => request(params).then(r => r.data);

const RequestMethod = {
    GET: "GET",
    POST: "POST",
}

const ContentType = {
    DEFAULT: "application/x-www-form-urlencoded",
    JSON: "application/json",
    MULTIPART: "multipart/form-data",
}

const jsonHeader = {
    ..._app.globalData.header,
    "content-type": ContentType.JSON,
}
const defaultHeader = {
    ..._app.globalData.header,
    "content-type": ContentType.DEFAULT,
}

module.exports = {
    request: request,
    upload: upload,
    requestOnlyData: requestOnlyData,
    RequestMethod: RequestMethod,
    ContentType: ContentType,
    jsonHeader: jsonHeader,
    defaultHeader: defaultHeader,
}