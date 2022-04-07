// 加载 工具类
const Paging = require('../../utils/paging_util');
const Constant = require('../../common/constant');

const $ = require('../../utils/request_util');
const StringUtil = require('../../utils/string_util');
const url_util = require('../../utils/url_util');

// 加载服务类
const userCandidateService = require('../../common/userCandidateService');
const recruitJobService = require('../../common/recruitJobService');
const loading_util = require('../../utils/loading_util');
// 定义常量
const app = getApp();

const createPageMethods = () => ({
    // 分页状态
    state: {
        pageConfig: new Paging.PageConfig(5),
        location: Constant.defaultLocation,
    },
    // const defaultLocation = {
    //     name: "五一广场",
    //     address: "湖南省长沙市芙蓉区黄兴中路",
    //     latitude: 28.19635,
    //     longitude: 112.97733,
    // }

    // 没有更多页面了
    _noMoreData() {
        this.setData({
            noMoreData: true,
        });
    },
    _loadLocation: async function (openid) {
        // 获取求职用户信息
        if (JSON.stringify(this.data.location) === '{}') {
            let loadUserPromise = userCandidateService.loadEntityById(openid);
            await loadUserPromise.then(r => {

                // 加载用户信息
                this.setData({
                    userOpenid: openid,
                    location: {
                        longitude: r.data.lon,
                        latitude: r.data.lat
                    }
                })
            }).catch(r => {
                console.error(r);
            });
        }
        let currentLocation = this.data.location;
        this.state.location = (currentLocation.longitude == 0 || currentLocation.latitude == 0) ?
            Constant.defaultLocation : currentLocation;
    },
    // 清空内容
    clearContent: async function () {
        this.state.pageConfig.reset();
        // 重置数据内容
        this.setData({
            joblist: []
        })
    },
    // 加载内容
    loadContent: async function (jobName, jobSalaryMin, jobSalaryMax) {
        // 加載openid
        await app.getOpenidReady();
        let openid = wx.getStorageSync('openid');

        // 回调 没有数据的处理方式
        this.state.pageConfig.setNoMoreDataCallback(this._noMoreData);

        // 初始化分页配置
        let pageConfig = this.state.pageConfig;
        ;
        // 加載位置 location
        await this._loadLocation(openid);
        let location = this.state.location;

        // 构建查询条件 condition
        let condition = {
            longitude: location.longitude,
            latitude: location.latitude,
        }
        let pagingParam = pageConfig.buildNextParam(condition);
        if (!pagingParam) {
            return;
        }
        // 获取分页内容
        let pageInfo;
        // 请求数据
        try {
            jobName = (jobName == undefined)? "": jobName;
            jobSalaryMin = (jobSalaryMin == undefined)? "": jobSalaryMin;
            jobSalaryMax = (jobSalaryMax == undefined)? "": jobSalaryMax;
            
            pageInfo = await recruitJobService.pagedByDistanceAndSalary(jobName, jobSalaryMin, jobSalaryMax, pagingParam)
            console.log(`薪资范围选择是${jobSalaryMin} - ${jobSalaryMax}, 请求搜索职位数据：`); console.log(pageInfo);
        } catch (e) {
            console.error(e);
        } finally {
        }
        let dataList = pageConfig.handlePageInfo(pageInfo);
        // 拼接数据示例
        // joblist: [
        // 	{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
        let current = this.data.joblist;
        let newList = dataList.map(jobInfo => ({
            jobUuid: jobInfo.jobId,
            jobname: jobInfo.jobName,
            jobmoney: new Constant.Salary(
                jobInfo.jobSalaryMin,
                jobInfo.jobSalaryMax,
            ).value,
            companyname: jobInfo.companyName,
            companytx: url_util.isImageUrlInServer(jobInfo.portraitPath) ? app.globalData.web_path + jobInfo.portraitPath : jobInfo.portraitPath,
            jl: (jobInfo.distance / 1000).toFixed(1),
            phonenum: jobInfo.telephone,
            recruiterOpenid: jobInfo.recruiterOpenid,
            companyUuid: jobInfo.companyId,
        }));

        // 拼接数据
        this.setData({
            joblist: current.concat(newList),
        });
    },

});

module.exports = {
    createPageMethods: createPageMethods,
}