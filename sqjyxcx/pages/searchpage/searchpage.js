// pages/searchpage/searchpage.js
const $ = require('../../utils/request_util');
const Loading = require('../../utils/loading_util');
const CONSTANT = require('../../common/constant');
const { Salary } = require('../../common/constant');
// 加载服务
const recruitJobService = require('../../common/recruitJobService');
const viewRecordService = require('../../common/viewRecordService');

// 附加模块
const searchpageEx = require('./searchpageEx');


const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		// 求职用户 信息
		userOpenid: '',
		location: {},

		// 弹窗
		sxkz: true,
		joblist: [
			// { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
			// { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
			// { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		],
		// 月薪
		yxyq: [
			// { yxmoney: '不限', id: 0, checked: true }, { yxmoney: '2千以下', id: 1 }, { yxmoney: '2千-3千', id: 2 }, { yxmoney: '3千-4千', id: 3 }, { yxmoney: '4千-5千', id: 4 }, { yxmoney: '5千-7千', id: 5 }, { yxmoney: '7千-1万', id: 6 }, { yxmoney: '1万-1.5万', id: 7 }
		],
		index: '',

		// 距离
		nyxz: [
			{ nl: '不限', id: 0, checked: true }, { nl: '距离最近', id: 1 }
		],
		oid: 0,
		hidesx: true,
	},

	bindconfirmSeachCategory(e) {
		var that = this;
		console.log(e.detail.value);
		let jobName = e.detail.value;
		try {
			Loading.begin();
			this.clearContent();
			this.loadContent(jobName,'','');
		} catch (e) {
			console.error(e)
		}finally{
			Loading.end()
		}
	},


	// 筛选事件
	sx() {
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	//月薪
	yxxz(e) {
		let id = e.currentTarget.dataset.id
		let yxyq_list = this.data.yxyq.map((v, i) => {
			v.checked = (i == id) ? true : false;
			return v;
		})
		this.setData({
			yxyq: yxyq_list
		})
	},
	//距离
	nlfw(e) {

		let id = e.currentTarget.dataset.id
		console.log(id)
		for (let i = 0; i < this.data.nyxz.length; i++) {
			if (this.data.nyxz[i].id == id) {
				this.setData({
					oid: id
				})
			}
		}

	},
	//打电话
	callphone(e) {
		let phonenum = e.currentTarget.dataset.phonenum
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
		})
	},
	//清空
	clear() {
		console.log(this.data.yxyq)
		let yxyqList = this.data.yxyq.map((v) => {
			v.checked = false;
			return v;
		})
		console.log(yxyqList);
		for (let q = 0; q < this.data.nyxz.length; q++) {
			this.setData({
				oid: 100
			})
		}
		this.setData({
			yxyq: yxyqList
		})
	},
	//确定
	async qd() {
		// 获取薪资范围参数
		let yxyqList = this.data.yxyq.filter((v) => {
			return v.checked == true;
		})
		let currentYxyq = yxyqList[0];
		if (currentYxyq == undefined || currentYxyq.id == 0) {
			await this.clearContent();
			await this.loadContent();

		} else {
			await this.clearContent();
			await this.loadContent(null, currentYxyq.min, currentYxyq.max);
		}

		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	// 点击跳转到对应岗位
	async bindtapChooseJob(e) {
		let jobData = this.data.joblist[e.currentTarget.dataset.index]
		let recruitJobUuid = jobData.jobUuid;
		// TODO 生成浏览记录  +  浏览量+1
		try {
			Loading.begin();
			await recruitJobService.increaseViewCount(recruitJobUuid);
			console.log('increasecountview完成');
			// // 构建ViewRecord
			// let viewRecord = {
			// 	candidateOpenid: this.data.userOpenid,
			// 	recruiterOpenid: jobData.recruiterOpenid,
			// 	companyUuid: jobData.companyUuid,
			// }
			// await viewRecordService.insertByEntity(viewRecord)
		} catch (e) {
			console.log(e);
		} finally {
			Loading.end();
			wx.navigateTo({
				url: "/pages/zwxq/zwxq?recruitJobUuid=" + jobData.jobUuid,
			})
		}

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		// 
		let that = this;
		// 获取用户openid
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');


		// 搜索条件 - 加载薪资
		let yxyq_list = [];
		let salaryList = CONSTANT.salaryList;
		// 特殊 - 不限薪资
		let unlimitSalary = new Salary(-1, -1);
		yxyq_list = salaryList.map((v, i) => {
			return {
				min: v.min,
				max: v.max,
				yxmoney: v.value,
				id: i + 1, // 预留第一位为默认 薪资不限
				checked: false,
			}
		});
		yxyq_list.unshift({
			min: unlimitSalary.min,
			max: unlimitSalary.max,
			yxmoney: unlimitSalary.value,
			id: 0,
			checked: true,
		})
		this.setData({
			yxyq: yxyq_list,
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
	onShow: async function () {
		try {
			Loading.begin();
			// 需要openid 加載用戶參數
			await app.getOpenidReady();
			// 每次进入前清空content
			await this.clearContent();
			await this.loadContent();

		} catch (e) {
			console.error(e)
		} finally {
			Loading.end();
		}
	},
	/**
		 * 页面上拉触底事件的处理函数
		 */
	onReachBottom: async function () {
		try {
			Loading.begin();
			await this.loadContent();
		} catch (e) {
			console.error(e)
		} finally {
			Loading.end();
		}
		
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
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	// 页面分页内容相关
	...searchpageEx.createPageMethods(),
})