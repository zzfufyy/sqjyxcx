// pages/zxxq/zxxq.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		title:'春风送温暖 就业送真情',
		ly:'岳麓区就业服务中心',
		fbsj:'3月02日',
		htmlSnip:'<p>日前，人力资源社会保障部联合工业和信息化部、民政部、交通运输部、国家乡村振兴局、全国总工会、共青团中央、全国妇联，在全国范围内部署开展2022年春风行动。此次行动以“春风送温暖 就业送真情”为主题，于1月21日至3月31日期间持续开展，集中为返乡返岗农民工、因疫情滞留的务工人员和脱贫人口、低收入人口等重点帮扶对象，以及有用工需求的各类用人单位提供就业服务，实现“留岗有关怀、就业有帮扶、用工有支持”，引导有序外出务工。	就业送真情”为主题，于1月21日至3月31日期间持续开展，集中为返乡返岗农民工、因疫情滞留的务工人员和脱贫人口、低收入人口等重点帮扶对象，以及有用工需求的各类用人单位提供就业服务，实现“留岗有关怀、就业有帮扶、用工有支持”，引导有序外出务工。活动期间，各地将引导有序外出务工，通过劳务协作和劳务品牌带动帮助劳动者就业增收，根据实际<p>',
		times:'233'
	},
	//分享按钮
	share(){

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		wx.getSystemInfo({
				success: function (res) {
					console.log(res)
					let oht = res.windowHeight - 52 - 64;
					that.setData({
						ht:oht
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
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
      // 来自页面内转发按钮
      title= "这个是页面自定义的分享事件~";
      // imageUrl='***.png';
    }
    if(res.from ==='menu'){
	  title= "这个是页面右上角的分享事件~";
	  // imageUrl='***.png';
    }
	},
	onShareTimeline(res) {
    console.log(res)
  }
})