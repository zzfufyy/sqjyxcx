// pages/massege/massege.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//判断是个人用户还是企业用户
		ident:'user',//user  company

		num:'3',
		wd:true,
		qywd:true,
		xttime:'3月02日',
		usertime:'3月02日',

		talklist:[
			{tximg:'/img/tx.png',name:'黄女士',wd:true,zt:'HR查看了你的简历，正在处理。',time:'3月02日'}
		],

		companytalklist:[
			{tximg:'/img/tx.png',name:'张三',wd:true,zt:'投递了简历',time:'3月02日'},
			{tximg:'/img/tx.png',name:'李四',wd:true,zt:'投递了简历',time:'3月02日'},
		],
	},
	//消息跳转
	talk(){
		let ident = this.data.ident
		console.log(ident)
		wx.navigateTo({
			url: '/pages/talkjobcom/talkjobcom?userident='+ident,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		wx.getSystemInfo({
			success: function (res) {
				let imgwd = (res.windowWidth-64 -25 -20);
				console.log(imgwd)
				that.setData({
					imgwd:imgwd
				})
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