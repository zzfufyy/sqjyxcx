// pages/personjl/personjl.js
const { GlobalKey } = require('../../service/global_service');
const { UserService } = require('../../service/user_service');

const Loading = require('../../utils/loading_util');
const CONSTANT = require('../../common/constant');
const StringUtil = require('../../utils/string_util');
const url_util = require('../../utils/url_util');
const date_util = require('../../utils/date_util');
// 加载服务
const candidateForCategoryService = require('../../common/candidateForCategoryService');
const candidateForCommunityService = require('../../common/candidateForCommunityService');


const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tximg: '',
		name: '',
		sex: '',
		// 年龄
		year: '',
		// 手机
		cellphone: '',
		// 工作年限  暂不做
		gznl: '',
		yxjobname: '',
		// 薪资范围
		ygz: '',
		sqname: [
			// { sqname: '东湖社区' },
			// { sqname: '定王台街道' },
			// { sqname: '湘湖街道' },
		],
		gzjy: '填写工作经验，让HR快速看到你',
		qzjy: [
			{
				companyname: '长沙竟网科技有限公司', jobname: 'UI设计师', jobyear: '2022.03-至今',
				jobdsc: [
					{ jobjl: '1.根据设计要求完成建筑风格、外形等总体设计;' },
					{ jobjl: '2.提供各种建筑主体设计、户型设计、外墙设计、景 观设计等;' }
				]
			}
		],
		boolean: false,
		jszj: '点击添加专业技能',
		selfpj: false,
		zwpj: '输入自我评价',

		zyjn: true,
		gerenzyjn: [
			{ jobjl: 'java,.net,c++' }
		],
	},

	//工作经历  添加
	gzjltj() {
		wx.navigateTo({
			url: '/pages/gzjl/gzjl',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	onShow: function () {
		// 页面数据加载
		Loading.begin();
		this._reloadData();
		app.getGlobal(GlobalKey.UserInfoChanged).addListener(this._listeneInfoChange);
		Loading.end();
	},

	onUnload: function (params) {
		console.debug('==================个人简历销毁==================');
		app.getGlobal(GlobalKey.UserInfoChanged).removeListener(this._listeneInfoChange);
	},

	_listeneInfoChange() {
		console.debug('个人简历页面监听数据改变');
		this._reloadData();
	},

	_reloadData: async function () {
		console.log('个人简历页面重载数据');
		var that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		try {

			let [userInfo, recruiteeInfo] = await Promise.all([
				UserService.loadUserInfo(),
				UserService.loadRcruiteeInfo(),
			]);
			console.log(userInfo);
			console.log(recruiteeInfo);
			// 加载 期望求职列表
			let expectCategoryListResult = await candidateForCategoryService.loadListByCandidateOpenid(openid);
			console.log(expectCategoryListResult);

			let yxjobnameList = [];
			expectCategoryListResult.data.forEach(r => {
				yxjobnameList.push({
					categoryName: r.categoryName,
				});
			})

			// 加载 期望社区列表
			let expectCommunityListResult = await candidateForCommunityService.loadListByCandidateOpenid(openid);
			console.log(expectCommunityListResult);
			let sqnameList = [];
			expectCommunityListResult.data.forEach(r => {
				sqnameList.push({
					sqname: r.communityName,
				});
			})
			this.setData({
				yxjobname: yxjobnameList,
				sqname: sqnameList,
			});
			this.setData({
				tximg: url_util.isImageUrlInServer(recruiteeInfo.portraitPath) ?
					app.globalData.web_path + recruiteeInfo.portraitPath : recruiteeInfo.portraitPath,
				name: recruiteeInfo.realName,
				sex: CONSTANT.genderList[recruiteeInfo.gender],
				ygz: new CONSTANT.Salary(
					recruiteeInfo.expectSalaryMin,
					recruiteeInfo.expectSalaryMax,
				).value,
				gznl: recruiteeInfo.ext1,
				zwpj: recruiteeInfo.introduction == '' ? '请添加个人简介' : recruiteeInfo.introduction,
				cellphone: recruiteeInfo.telephone,
				year: date_util.getAgeByBirthday(recruiteeInfo.birthday)
			});
		} finally {
		}
	},




})