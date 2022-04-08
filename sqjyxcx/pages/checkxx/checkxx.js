// pages/checkxx/checkxx.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		addres:'东湖新寓1栋1层1013',
		mj:'126',
		gj:'2室2厅 ',
		name:'张三',
		cell:'112345678901',
		yt:'住宅',
		jzrs:'2',
		aq:'电动车/地暖/空调/天然气/电磁炉/中央空调/电烤炉/直排型热水器',
		jurlist:[
			{jzname:'李四',sex:'女',age:'21',idcard:'431223189709782374',cellphone:'12345678901',local:'湖南省长沙市岳麓区'},
			{jzname:'李四',sex:'女',age:'21',idcard:'431223189709782374',cellphone:'12345678901',local:'湖南省长沙市岳麓区',dydz:'湖南省长沙市岳麓区岳麓大道31号',istsrq:'否',bz:'asdjasdkjkjaj'},
		]
	},
	scchxx(){
		wx.showModal({
			title: '提示',
			content: '东湖公寓1栋0103房是否确定删除该户录入信息？',
			confirmText:'确定',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
					wx.redirectTo({
						url: '/pages/sqsccg/sqsccg',
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//动态设置标题名
		wx.setNavigationBarTitle({
      title: '标题名称'
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