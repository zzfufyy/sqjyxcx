// pages/byll/byll.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pages:1,
		joblist:[
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
			{jobname:'清洁工',jobmoney:'3000-3800',companyname:'文和友餐饮有限公司',companytx:'/img/tx.png',jl:'1.5',phonenum:'13112345678'},
		],
		comnum:0,
	},
	//打电话
	callphone(e){
		console.log(e.currentTarget.dataset.phonenum)
		let phonenum = e.currentTarget.dataset.phonenum
		wx.makePhoneCall({
			phoneNumber: phonenum //仅为示例，并非真实的电话号码
		})
	},
	loadViewRecord:function(){
		var that = this
		let pages = that.data.pages
		let openid = wx.getStorageSync('openid');
		wx.request({
			url: app.globalData.web_path+'/view-record/list',
			data: { pages:pages,openid:openid},
			header: app.globalData.header,
			method: "POST",
			success: function (data) {
				console.log(data)
				let recruitCompanyArrayList = data.data.obj.recruitCompanyArrayList;
				let userRecruiterArrayList = data.data.obj.userRecruiterArrayList;
				let viewRecord = data.data.obj.viewRecordList;
				let userCandidate = data.data.obj.userCandidate;
				var joblist=[];
				for(let i=0;i<viewRecord.length;i++){
					var jl =that.getDistance(userCandidate.lat,userCandidate.lon,recruitCompanyArrayList[i].lat,recruitCompanyArrayList[i].lon)
					var jobs = {jobname:recruitCompanyArrayList[i].companyName,jobmoney:'3000-3800',companyname:recruitCompanyArrayList[i].juridicalPerson,companytx:recruitCompanyArrayList[i].portraitPath,jl:jl,phonenum:recruitCompanyArrayList[i].juridicalPhone}
					joblist.push(jobs)
				}
				that.setData({
					joblist:joblist,
					comnum:viewRecord.length,
				})
			}
		})
	},

	//计算两坐标点之间的距离
	  getDistance: function (lat1, lng1, lat2, lng2) {
		    lat1 = lat1 || 0;
		    lng1 = lng1 || 0;
		    lat2 = lat2 || 0;
		    lng2 = lng2 || 0;
		    var rad1 = lat1 * Math.PI / 180.0;
		    var rad2 = lat2 * Math.PI / 180.0;
		    var a = rad1 - rad2;
		    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
		    var r = 6378137;
		    return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
			
	  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.loadViewRecord();
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