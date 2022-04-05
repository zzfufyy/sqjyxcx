// 加载 工具类
const Paging = require('../../utils/paging_util');
const Constant = require('../../common/constant');

const $ = require('../../utils/request_util');
const StringUtil = require('../../utils/string_util');
const url_util = require('../../utils/url_util');
const loading_util = require('../../utils/loading_util');

// 加载服务类
const userCandidateService = require('../../common/userCandidateService');
const recruitJobService = require('../../common/recruitJobService');
const viewRecordService = require('../../common/viewRecordService');

// 定义常量
const app = getApp();
const createPageMethods = () => ({
    // 分页状态
    state: {
        pageConfig: new Paging.PageConfig(5),
        location: Constant.defaultLocation,
    },
    _noMoreData() {
        this.setData({
            noMoreData: true,
        });
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
      loadContent: async function () {
        // 加載openid
        await app.getOpenidReady();
        let openid = wx.getStorageSync('openid');

        // 回调 没有数据的处理方式
        this.state.pageConfig.setNoMoreDataCallback(this._noMoreData);

        // 初始化分页配置
        let pageConfig = this.state.pageConfig;
        // 构建查询条件 condition
        let condition = openid;

        let pagingParam = pageConfig.buildNextParam(condition);
        if (!pagingParam) {
            return;
        }
        // 获取分页内容
        let pageInfo;
        // 请求数据
        try {
            pageInfo = await viewRecordService.pagedByDistance(pagingParam)
            console.log(pageInfo);
        } catch (e) {
            console.error(e);
        } finally {
        }
        let dataList = pageConfig.handlePageInfo(pageInfo);
        // 拼接数据示例
        // joblist:[
        //     {jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
        let current = this.data.joblist;
        let newList = dataList.map(v => ({
            companyname: v.companyName,
            companytx: url_util.isImageUrlInServer(v.portraitPath) ? 
                    app.globalData.web_path + v.portraitPath : v.portraitPath,
            jl: (v.distance / 1000).toFixed(1),
            phonenum: v.phone,
            candidateOpenid: v.recruiterOpenid,
            companyUuid: v.companyId,
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