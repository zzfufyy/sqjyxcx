// pages/wgmanage/wgmanage.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		sqname:'东湖社区',
		lxfs:'0731-438953853',
		sqlocal:'湖南省长沙市芙蓉区晚报西街13号',
		imgurl:''
	},
	//点击上传图片
	scimgbtn(){
		let that = this
		wx.chooseMedia({
			count: 1,
			mediaType: ['image'],
			sourceType: ['album', 'camera'],
			maxDuration: 30,
			camera: 'back',
			success(res) {
				console.log(res)
				that.setData({
					imgurl:res.tempFiles[0].tempFilePath
				})
			}
		})
	},
	//点击保存
	tijsq(){
		wx.navigateBack({
			delta: 1
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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