// pages/selfpj/selfpj.js

const { UserService, user } = require('../../service/user_service');
const loading = require('../../utils/loading_util');

const app = getApp();


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		zwpj: ''
	},
	//保存事件
	tijsq(e) {
		let introduction = this.data.zwpj;

		console.debug(`Saving introduction ${introduction}`);

		loading.wrap(
			() => UserService.saveRecruiteeInfo({
				introduction: introduction,
			}),
		)
			// 返回前一页
			.then((_) => {
				wx.redirectTo({
					url: '/pages/personjl/personjl',
				});
			});

	},

	zwpj(e) {
		this.setData({
			zwpj: e.detail.value,
		});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this._init();
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

	},

	_init: async function () {
		await app.getOpenidReady();

		let recruiteeInfo = await UserService.loadRcruiteeInfo();

		this.setData({
			zwpj: recruiteeInfo.introduction,
		});
	}
})