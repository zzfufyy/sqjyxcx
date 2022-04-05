// pages/loojl/lookjl.js
const $ = require('../../utils/request_util');

const Loading = require('../../utils/loading_util');
const string_util = require('../../utils/string_util');
const CONSTANT = require('../../common/constant');
const date_util = require('../../utils/date_util');
const url_util = require('../../utils/url_util');

const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const userCandidateService = require('../../common/userCandidateService');
const candidateForCommunityService = require('../../common/candidateForCommunityService');

const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tximg: '/img/tx.png',
		name: '张三',
		sex: '女',
		year: '24',
		gznl: '10分钟前活跃',
		yxjobname: '保洁工作',
		ygz: '3000-5000',
		qwdq: '天源社区 ',
		grjs: '接受部长分配的服务工作，向客人提供优质服务。负责开餐前的准备工作。爱护餐厅设施设备，并对其实施保养、清洁。搞好营业前后的卫生工作，保持餐厅环境整洁，确保餐具，部件等清洁完好。',
		compangjob: [
			{
				job: '服务员/保洁', companyjuli: '1.2', companylocal: '长沙县泉塘街道新长海广场', sq: '天源社区', juli: '1.2',
				tagxb: '女', tagnl: '29', taggz: '3000-5000', persontx: '/img/tx.png', personname: '张三 '
			},
		],
		cellphne: '13112345678',
		ident: 'company'

	},
	// 打电话
	callnum(e) {
		let that = this
		let phonenum = e.currentTarget.dataset.cellphne
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
		})
	},

	/**个人介绍**/
	setInputValue3: function (e) {
		console.log(e)
	},

	// 聊一聊
	talk() {
		let ident = this.data.ident
		wx.navigateTo({
			url: '/pages/talkjobcom/talkjobcom?userident=' + ident,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		console.log(options);
		Loading.begin()
		let candidateOpenid = options.candidateOpenid;
		await app.getOpenidReady();
		try {
			// 加载数据
			let userCandidateData = await userCandidateService.loadEntityById(candidateOpenid);
			let uc = userCandidateData.data;
			let communityListData = await candidateForCommunityService.loadListByCandidateOpenid(candidateOpenid)
			let qwdq = '';
			communityListData.data.forEach(v => {
				qwdq += (v.communityName + '  ');
			})
			this.setData({
				tximg: url_util.isImageUrlInServer(uc.portraitPath) ?
					app.globalData.web_path + uc.portraitPath : uc.portraitPath,
				name: uc.realName,
				sex: CONSTANT.genderList[uc.gender],
				year: string_util.isEmpty(uc.birthday) ? '' : date_util.getAgeByBirthday(uc.birthday) + '岁',
				gznl: '', // TODO 10分钟前活跃
				ygz: new CONSTANT.Salary(uc.expectSalaryMin, uc.expectSalaryMax).value,
				qwdq:qwdq,
				grjs: uc.introduction,
				cellphne: uc.telephone,
			})
		} catch (e) {
			console.error(e);
		}
		Loading.end();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			title = "这个是页面自定义的分享事件~";
			// imageUrl='***.png';
		}
		if (res.from === 'menu') {
			title = "这个是页面右上角的分享事件~";
			// imageUrl='***.png';
		}
	},
	onShareTimeline(res) {
		console.log(res)
	}
})