// pages/msjob/msjob.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		currentId: '0',
		currentTab:'0',
		yhid:"",
		organid:"",
    section: [],
		joblist:[
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
		],
		jobgtlist:[
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13212345678'},
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
		],
		jobbhslist:[
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13312345678'},
		],

	},
	//点击头部导航的点击事件
	handleTap: function(e) {
		let id = e.currentTarget.id;
		if(id){
			this.setData({
				currentId:id,
					currentTab: id,
			})
		}
	},
	// 滚动切换标签样式 
	switchTab: function(e) {
		// console.log(e) 
		var that = this; 
		that.setData({
		 currentTab: e.detail.current,
		 currentId: e.detail.current
		}); 
	},
	//打电话
	callphone(e){
		console.log(e.currentTarget.dataset.phonenum)
		let phonenum = e.currentTarget.dataset.phonenum
		wx.makePhoneCall({
			phoneNumber: phonenum //仅为示例，并非真实的电话号码
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		let joblist = that.data.joblist;
		let jobgtlist = that.data.jobgtlist;
		let jobbhslist = that.data.jobbhslist;
		let section1 =  [
			{name: '待查看',typeId: '0',num:joblist.length}, 
			{name: '沟通中',typeId: '1',num:jobgtlist.length},
			{name: '不合适',typeId: '2',num:jobbhslist.length},
		]
		that.setData({
			section: section1
		});
		
		wx.getSystemInfo({
				success: function (res) {
					that.setData({
						winWidth: res.windowWidth,
						winHeight: res.windowHeight,
					});
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