// pages/sqfw/sqfw.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		sqname:'东湖社区',
		localtt:'湖南省长沙市芙蓉区晚报西街13号',
		zhjy:[
			{url:'',bac:'#EEF7FE',iconimg:'/img/qyzp.png',name:'企业招聘'},
			{url:'',bac:'#FEFAEE',iconimg:'/img/qzjy.png',name:'求职就业'},
			{url:'/pages/wglr/wglr',bac:'#F3EEFC',iconimg:'/img/wglr.png',name:'网格录入'},
			{url:'/pages/sqgl/sqgl',bac:'#EEFBFE',iconimg:'/img/sqgl.png',name:'社区管理'},
			{url:'',bac:'#F5FFE8',iconimg:'/img/ryd.png',name:'蓉e贷'},
			{url:'',bac:'#FFF6F6',iconimg:'/img/xwgg.png',name:'新闻公告'},
		],
		newlist: [
			{ptit:'春风送温暖 就业送真情',pcont:'【湖南省】关于印发《湖南省“十四五”金融业发展规划》的通知湖南省地方金融监督管理局关于印发《湖南省“十四五”金融业发展规划》的通知',pjg:'岳麓区就业服务中心',ptime:'3月02日',ltimg:'http://frqryb.oss-accelerate.aliyuncs.com/headphoto/16297916583243346b1330ea-9a71-4ea4-85d0-02c7556c3b40.jpeg'},
			{ptit:'春风送温暖 就业送真情',pcont:'【湖南省】关于印发《湖南省“十四五”金融业发展规划》的通知湖南省地方金融监督管理局关于印发《湖南省“十四五”金融业发展规划》的通知',pjg:'岳麓区就业服务中心',ptime:'3月02日',ltimg:'http://frqryb.oss-accelerate.aliyuncs.com/headphoto/16297916583243346b1330ea-9a71-4ea4-85d0-02c7556c3b40.jpeg'},
		],
	},
	// 打电话
	cellphone: function(){
    wx.makePhoneCall({
      phoneNumber: '03123688777',
    })
	},
	//咨询详情
	fczcbtnclick(){
		wx.navigateTo({
			url: '/pages/zxxq/zxxq',
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