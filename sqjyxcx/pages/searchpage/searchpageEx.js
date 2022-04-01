// 加载 工具类
const Paging = require('../../utils/paging_util');
const Constant = require('../../common/constant');
const Loading = require('../../utils/loading_util');
const $ = require('../../utils/request_util');
const StringUtil = require('../../utils/string_util');
const url_util = require('../../utils/url_util');

// 加载服务类
const { RecruitJobService } = require('../../service/recruit_job_service');
// 定义常量
const app = getApp();

const createPageMethods = () => ({
    // 分页状态
    state: {
        pageConfig: new Paging.PageConfig(5),
        location: Constant.defaultLocation,
    },
    // 没有更多页面了
    _noMoreData() {
        this.setData({
            noMoreData: true,
        });
    },

    loadContent: async function() {
        console.log(this);
        this.state.pageConfig.setNoMoreDataCallback(this._noMoreData);
        // 初始化分页配置
        let pageConfig = this.state.pageConfig;
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
        try {
            Loading.begin();
            // 请求数据
            pageInfo = await RecruitJobService.pagedByDistacne(pagingParam);
            console.log('请求岗位数据：');
            console.log(pageInfo)
        } catch (e) {
            console.error(e);
        } finally {
            Loading.end();
        }
        let dataList = pageConfig.handlePageInfo(pageInfo);
        // joblist: [
		// 	{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		// 	{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		// 	{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		// ],
        let current = this.data.joblist;

        let newList = dataList.map(jobInfo => ({
            jobUuid: jobInfo.jobId,
            jobname: jobInfo.jobName,
            jobmoney: new Constant.Salary(
                jobInfo.jobSalaryMin,
                jobInfo.jobSalaryMax,
            ).value,
            companyname: jobInfo.companyName,
            companytx: url_util.isImageUrlInServer(jobInfo.portraitPath)? app.globalData.web_path + jobInfo.portraitPath: jobInfo.portraitPath,
            jl: (jobInfo.distance/1000).toFixed(1),
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