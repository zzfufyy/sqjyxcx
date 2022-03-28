// pages/zwxq/zwxq.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitJobService = require('../../common/recruitJobService');
const recruitRecordService = require('../../common/recruitRecordService');
const CONSTANT = require('../../common/constant');
const { Salary } = require('../../common/constant');
const { loadRecruitCompanyById } = require('../../common/recruitCompanyService');

const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 求职者信息
		flagWhoReceive: 1,

		// 各个id
		candidateOpenid: '',
		recruiterOpenid: '',
		companyUuid: '',
		jobUuid: '',
		categoryUuid: '',
		// 招聘者信息

		jobName: '清洁工',
		salaryScope: '3000-3800',
		jobyq: { rs: '招1人' },
		// jobyq: { rs: '招1人', nl: '30-45', worknj: '3-5', xl: '学历不限' },
		xqxq: '1.工作职责: 室内保洁人员主要负责办公楼、仪电楼、化工楼内公共区域的清扫工作。 室外保洁	2.卫生标准及要求:3.室内保洁: 保持走廊地面无脚印、无口香糖印,夏季地面无土,冬季无结冰下',

		comname: '长沙星沙文和友餐饮文化',
		conadrres: '长沙岳麓区中电软件园A栋1920 ',
		portraitPath: '',
		recruiterTelephone: '',
		ident: "user"
	},
	// 聊一聊
	talk() {
		let ident = this.data.ident
		wx.navigateTo({
			url: '/pages/talkjobcom/talkjobcom?userident=' + ident,
		})
	},
	//投递简历
	tdjl(e) {
		let that = this;
		wx.showModal({
			title: '提示',
			content: '是否投递简历',
			async success(res) {
				if (res.confirm) {
					console.log('用户点击确定')
					// 生成简历记录
					let insertData = {
						flagWhoReceive: that.data.flagWhoReceive,
						flowRecruit: 0, // 待查看
						candidateOpenid: that.data.candidateOpenid,
						recruiterOpenid: that.data.recruiterOpenid,
						companyUuid: that.data.companyUuid,
						jobUuid: that.data.jobUuid,
						categoryUuid: that.data.categoryUuid,
					}
					let insertPromise = recruitRecordService.insertByEntity(insertData);
					await insertPromise
						.then(r => console.log(r))
						.catch(r => console.error(r))
					wx.switchTab({
					  url: '/pages/index/index',
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	callPhone(e) {
		console.log(this.data);
		wx.makePhoneCall({
			phoneNumber: this.data.recruiterTelephone,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let that = this;
		let recruitJobUuid = this.options.recruitJobUuid;
		// 测试用：
		recruitJobUuid = '47219d8c-2d6a-4f9b-9f7a-01496e7b46bd';
		// 获取用户openid
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');

		// 加载岗位信息
		let loadRecruitJobPromise = recruitJobService.loadEntityById(recruitJobUuid);
		that.setData({
			candidateOpenid: openid,
		})
		await loadRecruitJobPromise.then(r => {
			console.log(r);
			that.setData({
				// 公司id
				recruiterOpenid: r.data.recruiterOpenid,
				companyUuid: r.data.companyUuid,
				jobUuid: r.data.id,
				categoryUuid: r.data.categoryUuid,
				// 表单信息加载
				jobName: r.data.jobName,
				salaryScope: new Salary(r.data.jobSalaryMin, r.data.jobSalaryMax).value,
				jobyq: { rs: '招 ' + r.data.recruitingNumber + ' 人' },
				xqxq: r.data.jobIntroduction,
				recruiterTelephone: r.data.recruiterTelephone,
			})

		}).catch(r => console.error(r));

		// 加载公司信息
		let loadRecruitCompanyPromise = recruitCompanyService.loadEntityById(this.data.companyUuid);
		await loadRecruitCompanyPromise.then(r => {
			console.log(r);
			that.setData({
				comname: r.data.companyName,
				conadrres: r.data.address + '  ' + r.data.addressDetail,
				portraitPath: app.globalData.web_path + r.data.portraitPath,

			})
		}).catch(r => console.error(r));
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