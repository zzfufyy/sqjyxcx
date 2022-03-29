// pages/msjob/msjob.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitRecordService = require('../../common/recruitRecordService');
const CONSTANT = require('../../common/constant');
const { Salary } = require('../../common/constant');

const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		currentId: '0',
		currentTab: '0',
		yhid: "",
		organid: "",
		section: [],
		// flow_recruit 未反馈 0
		joblist: [
			{ jobUuid: '', flowRecruit: 0, jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		],
		// 沟通中 1
		jobgtlist: [
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13212345678' },
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		],
		// 不合适 -1
		jobbhslist: [
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13312345678' },
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13312345678' }
		],

	},
	//点击头部导航的点击事件
	handleTap: function (e) {
		let id = e.currentTarget.id;
		if (id) {
			this.setData({
				currentId: id,
				currentTab: id,
			})
		}
	},
	// 滚动切换标签样式 
	switchTab: function (e) {
		// console.log(e) 
		var that = this;
		that.setData({
			currentTab: e.detail.current,
			currentId: e.detail.current
		});
	},
	//打电话
	callphone(e) {
		console.log(e.currentTarget.dataset.phonenum)
		let phonenum = e.currentTarget.dataset.phonenum
		wx.makePhoneCall({
			phoneNumber: phonenum //仅为示例，并非真实的电话号码
		})
	},
	// 
	bindtapJoblist(e) {
		console.log(e);
		let recruitJobUuid = this.data.joblist[e.currentTarget.dataset.index].jobUuid;
		// console.log(recruitJobUuid);
		wx.navigateTo({
			url: "/pages/zwxq/zwxq?recruitJobUuid=" + recruitJobUuid,
		})
	},
	bindtapJobgtlist(e) {
		console.log(e);
		let recruitJobUuid = this.data.joblist[e.currentTarget.dataset.index].jobUuid;
		// console.log(recruitJobUuid);
		wx.navigateTo({
			url: "/pages/zwxq/zwxq?recruitJobUuid=" + recruitJobUuid,
		})
	},
	bindtapJobbhslist(e) {
		console.log(e);
		let recruitJobUuid = this.data.joblist[e.currentTarget.dataset.index].jobUuid;
		// console.log(recruitJobUuid);
		wx.navigateTo({
			url: "/pages/zwxq/zwxq?recruitJobUuid=" + recruitJobUuid,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');

		let loadRecordListPormise = recruitRecordService.listRecordPlusByCandidateOpenid(openid);
		let sumJobList = [];
		// {jobname:'清洁工',
		// jobmoney:'3000-3800',
		// companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
		await loadRecordListPormise.then(r => {
			console.log(r);
			r.data.forEach((v) => {
				console.log(v);
				let tempData = {
					jobUuid: v.jobUuid,
					jobname: v.jobName,
					jobmoney: new Salary(v.jobSalaryMin, v.jobSalaryMax).value,
					companyname: v.companyName,
					companytx: app.globalData.web_path + v.portraitPath,
					jl: (v.distance / 1000).toFixed(1),
					phonenum: v.telephone,
					flowRecruit: v.flowRecruit,
				}
				sumJobList.push(tempData);
			})
		}).catch(r => {
			console.error(r);
		});
		console.log(sumJobList);
		let joblist = [];
		let jobgtlist = [];
		let jobbhslist = [];
		sumJobList.forEach(v => {
			switch (v.flowRecruit) {
				case CONSTANT.FLOW_RECRUIT.NORMAL:
					joblist.push(v); break;
				case CONSTANT.FLOW_RECRUIT.PROCESSING: // 沟通
					jobgtlist.push(v); break;
				case CONSTANT.FLOW_RECRUIT.UNSUITABLE: // 不合适
					jobbhslist.push(v); break;
			}
		})
		console.log(joblist);
		// 设置数据：
		this.setData({
			joblist: joblist,
			jobgtlist: jobgtlist,
			jobbhslist: jobbhslist,
		})
		let section1 = [
			{ name: '未反馈', typeId: '0', num: joblist.length },
			{ name: '沟通中', typeId: '1', num: jobgtlist.length },
			{ name: '不合适', typeId: '2', num: jobbhslist.length },
		]
		that.setData({
			section: section1
		});
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight,
				});
			}
		})
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
	onShareAppMessage: function () {

	}
})