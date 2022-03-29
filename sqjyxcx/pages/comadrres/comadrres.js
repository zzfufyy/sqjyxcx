// pages/comadrres/comadrres.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');

const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		companyUuid: '',
		address: '',
		addressDetail: '',
		lon: 0.00,
		lat: 0.00,
	},
	// 保存
	async bc() {
		let that = this;
		let updateData = {
			id: this.data.companyUuid,
			address: this.data.address,
			addressDetail: this.data.addressDetail,
			lon: this.data.lon,
			lat: this.data.lat,
		}
		console.log(updateData);
		let updatePromise = recruitCompanyService.updateRecruitCompany(updateData);
		await updatePromise
			.then(r => console.log(r))
			.catch(r => console.error(r));
		wx.navigateTo({
			url: '/pages/rzcenter/rzcenter',
		})
	},
	bindinputAddressDetail(e){
		this.setData({
			addressDetail: e.detail.value,
		})
	},
	//定位
	changedw(e) {
		let that = this
		wx.chooseLocation({
			type: 'gcj02',
			success(res) {
				console.log(res)
				const latitude = res.latitude
				const longitude = res.longitude
				var positionData = res.address + res.name
				console.log(positionData);
				that.setData({
					address: positionData,
					lon: longitude.toFixed(6),
					lat: latitude.toFixed(6),
				})
			}
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
		await loadRecruiterPromise.then((r) => {
			console.log(r);
			that.setData({
				companyUuid: r.data.companyUuid
			})
		}).catch((r) => {
			console.error(r);
		})

		let loadCompanyPromise = recruitCompanyService.loadEntityById(this.data.companyUuid);
		await loadCompanyPromise.then((r) => {
			console.log(r);
			that.setData({
				address: r.data.address,
				addressDetail: r.data.addressDetail,
			})
		}).catch((r) => {
			console.error(r);
		})
		console.log(this.data);
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