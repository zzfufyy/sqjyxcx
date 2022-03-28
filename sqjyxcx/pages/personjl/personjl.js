// pages/personjl/personjl.js
const { GlobalKey } = require('../../service/global_service');
const { UserService } = require('../../service/user_service');

const Loading = require('../../utils/loading_util');
const Constant = require('../../common/constant');
const StringUtil = require('../../utils/string_util');

const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tximg: '',
		name: '',
		sex: '',
		year: '24',
		cellphone: '',
		gznl: '1-3',
		yxjobname: '保洁工作',
		ygz: '3000-5000',
		sqname: [
			{ sqname: '东湖社区' },
			{ sqname: '定王台街道' },
			{ sqname: '湘湖街道' },
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
		console.debug('==================个人简历加载==================');
		this._reloadData();
		app.getGlobal(GlobalKey.UserInfoChanged).addListener(this._listeneInfoChange);
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
		await app.getOpenidReady();

		try {
			Loading.begin();
			let [userInfo, recruiteeInfo] = await Promise.all([
				UserService.loadUserInfo(),
				UserService.loadRcruiteeInfo(),
			]);

			// let userInfo = infoList[0];
			// let recruiteeInfo = infoList[1];

			this.setData({
				tximg: StringUtil.getSROD(
					recruiteeInfo.portraitPath,
					userInfo.avatarurl,
				),
				name: StringUtil.emptyBlocking(
					recruiteeInfo.realName,
					userInfo.nickname,
				),
				sex: Constant.genderList[recruiteeInfo.gender],
				ygz: new Constant.Salary(
					recruiteeInfo.expectSalaryMin,
					recruiteeInfo.expectSalaryMax,
				).value,
				zwpj: recruiteeInfo.introduction,
				cellphone: StringUtil.maybeEmptyString(recruiteeInfo.telephone),
			});
		} finally {
			Loading.end();
		}
	}
})