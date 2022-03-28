// pages/comjs/comjs.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
let app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		companyUuid:'',
		introduction:'',
	},
	// 绑定公司介绍
	bindinputIntroduction(e){
		this.setData({
			introduction:e.detail.value,
		})
	},
	// 提交
	async tijsq(){
		let submitData = {
			id : this.data.companyUuid,
			introduction: this.data.introduction,
		}
		let submitPromise = $.request({
			url:'/recruit-company/modify',
			method: $.RequestMethod.POST,
			header: $.jsonHeader,
			data: submitData,
		})
		submitPromise.then(r =>{
			console.log(r);
		}).catch(r=> console.error(r))
		await submitPromise;
		// 跳转回认证中心
		wx.navigateTo({
			url: '/pages/rzcenter/rzcenter',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		console.log(openid);
		// 加载用户信息
		let loadRecruiterPromise = userRecruiterService.loadEntityById(openid);
		loadRecruiterPromise.then((r) => {
			console.log(r);
			that.setData({
				companyUuid: r.data.companyUuid
			})
		}).catch((r) => {
			console.error(r);
		})
		await loadRecruiterPromise;

		let loadCompanyPromise = recruitCompanyService.loadEntityById(this.data.companyUuid);
		loadCompanyPromise.then((r) => {
			console.log(r);	
			that.setData({
				introduction: r.data.introduction,
			})
		}).catch((r) => {
			console.error(r);
		})
		console.log(this.data)
		await loadCompanyPromise;

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