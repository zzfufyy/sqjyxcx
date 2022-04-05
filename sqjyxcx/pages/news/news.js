// pages/news/news.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const informationNewsService = require('../../common/informationNewsService');
const date_util = require('../../utils/date_util');

const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		newlist: [
			{ newsUuid:'',ptit: '春风送温暖 就业送真情', pcont: '【湖南省】关于印发《湖南省“十四五”金融业发展规划》的通知湖南省地方金融监督管理局关于印发《湖南省“十四五”金融业发展规划》的通知', pjg: '岳麓区就业服务中心', ptime: '3月02日', ltimg: 'http://frqryb.oss-accelerate.aliyuncs.com/headphoto/16297916583243346b1330ea-9a71-4ea4-85d0-02c7556c3b40.jpeg' },
			{ ptit: '春风送温暖 就业送真情', pcont: '【湖南省】关于印发《湖南省“十四五”金融业发展规划》的通知湖南省地方金融监督管理局关于印发《湖南省“十四五”金融业发展规划》的通知', pjg: '岳麓区就业服务中心', ptime: '3月02日', ltimg: 'http://frqryb.oss-accelerate.aliyuncs.com/headphoto/16297916583243346b1330ea-9a71-4ea4-85d0-02c7556c3b40.jpeg' },
		]
	},
	fczcbtnclick(e) {
		console.log(e);
		let newsUuid = e.currentTarget.id;
		wx.navigateTo({
			url: '/pages/zxxq/zxxq?newsUuid=' + newsUuid,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');

		// 加载list
		let loadListPromise = informationNewsService.loadListOrderByReleaseTime();
		let tempList = [];
		// { ptit: '春风送温暖 就业送真情', pcont: '【湖南省】关于印发《湖南省“十四五”金融业发展规划》的通知湖南省地方金融监督管理局关于印发《湖南省“十四五”金融业发展规划》的通知', pjg: '岳麓区就业服务中心', ptime: '3月02日', ltimg: 'http://frqryb.oss-accelerate.aliyuncs.com/headphoto/16297916583243346b1330ea-9a71-4ea4-85d0-02c7556c3b40.jpeg' },
		await loadListPromise.then(r => {
			r.data.forEach(v =>{
				tempList.push({
					newsUuid: v.id,
					ptit: v.articleTitle,
					pcont: v.articleIntroduction,
					pjg: v.articleAuthor,
					ptime: date_util.dateToCN(v.articleReleaseTime),
					ltimg: v.articlePortraitPath,
				})
			})
			console.log(r);
		}).catch(r => {
			console.error(r)
		});
		this.setData({
			newlist: tempList,
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