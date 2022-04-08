// 加载 工具类
const Paging = require('../../utils/paging_util');
const Constant = require('../../common/constant');

const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const url_util = require('../../utils/url_util');

// 加载服务类
const userRecruiterService = require('../../common/userRecruiterService');
const userCandidateService = require('../../common/userCandidateService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitJobService = require('../../common/recruitJobService');
const Loading = require('../../utils/loading_util');
const date_util = require('../../utils/date_util');
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
    _loadLocation: async function (openid) {
        // 获取求职用户信息
        if (JSON.stringify(this.data.location) === '{}') {
            let userRecruiterData = await userRecruiterService.loadEntityById(openid);
            let userRecruiterInfo = userRecruiterData.data;

            let loadCompanyPromise = recruitCompanyService.loadEntityById(userRecruiterInfo.companyUuid);

            await loadCompanyPromise.then(r => {
                // 加载公司信息
                this.setData({
                    companyUuid: r.data.id,
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
            compangjob: []
        })
    },

    // 加载内容
    loadContent: async function (categoryName, jobSalaryMin, jobSalaryMax) {
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
            categoryName = (categoryName == undefined) ? "" : categoryName;
            jobSalaryMin = (jobSalaryMin == undefined) ? "" : jobSalaryMin;
            jobSalaryMax = (jobSalaryMax == undefined) ? "" : jobSalaryMax;
            pageInfo = await userCandidateService.pagedByDistanceAndSalary(categoryName, jobSalaryMin, jobSalaryMax, pagingParam)

            console.log(`薪资范围选择是${jobSalaryMin} - ${jobSalaryMax}, 请求搜索职位数据：`);
            console.log(pageInfo);
        } catch (e) {
            console.error(e);
        } finally {
        }
        let dataList = pageConfig.handlePageInfo(pageInfo);
        // 拼接数据示例
        // {
        //     jobname: '服务员/保洁', 
        //     usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
        //     name: '张三', 
        //     tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
        // },
        let current = this.data.compangjob;
        let newList = dataList.map(r => ({
            candidateOpenid: r.candidateOpenid,
            name: r.realName,
            jobname: string_util.isEmpty(r.categoryName) ? '' : r.categoryName.replaceAll(',', '/'),
            usertag: [
                { tagbq: Constant.genderList[r.gender] },
                { tagbq: string_util.isEmpty(r.birthday) ? '' : date_util.getAgeByBirthday(r.birthday) + '岁' },
                { tagbq: new Constant.Salary(r.expectSalaryMin, r.expectSalaryMax).value },
            ],
            tximg: url_util.isImageUrlInServer(r.candidatePortraitPath) ?
                app.globalData.web_path + r.portraitPath : r.portraitPath,
            sqname: string_util.isEmpty(r.communityName) ? '' : r.communityName,
            companyjuli: (r.distance / 1000).toFixed(1),
        }));

        // 拼接数据
        this.setData({
            compangjob: current.concat(newList),
        });
    },

});

module.exports = {
    createPageMethods: createPageMethods,
}