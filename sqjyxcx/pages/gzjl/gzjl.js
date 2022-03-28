// pages/gzjl/gzjl.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		date: '2016-09',
		newdate:'',
		dateend:'2016-09',
		newdate1:'',

		bgainyear:'',
		bgainmonth:'',
		endyear:'',
		endmonth:''
	},
	// 开始时间选择
	bindDateChange: function(e) {
		console.log(e.detail.value)
    this.setData({
      date: e.detail.value
		})
		let odate = this.data.date
		let dateval = (odate).replace("-","年")
		this.setData({
			newdate:dateval,
			bgainyear:odate.slice(0,4),
			bgainmonth:odate.slice(-2)
		})

  },
	// 结束时间选择
	bindDateChange1: function(e) {
		console.log(e.detail.value)
    this.setData({
      dateend: e.detail.value
		})
		let odate = this.data.dateend
		let dateval = (odate).replace("-","年")
		this.setData({
			newdate1:dateval,
			endyear:odate.slice(0,4),
			endmonth:odate.slice(-2)
		})
	},
	//保存事件
	tijsq(){
		let bgainyear = parseInt(this.data.bgainyear)
		let bgainmonth =    parseInt(this.data.bgainmonth)
		let endyear =    parseInt(this.data.endyear)
		let endmonth =    parseInt(this.data.endmonth)
		console.log('bgainyear---'+bgainyear)
		console.log('bgainmonth---'+bgainmonth)
		console.log('endyear---'+endyear)
		console.log('endmonth---'+endmonth)
		// if(endyear!=''&&endmonth!=''){
			// console.log("00")
			if(bgainyear > endyear){
				console.log("11")

				wx.showModal({
					title: '提示',
					content: '开始时间大于结束时间，请重新选择',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}else  if(bgainyear = endyear){
				if(bgainmonth>endmonth){
					console.log("000")
					wx.showModal({
						title: '提示',
						content: '开始时间大于结束时间，请重新选择',
						success (res) {
							if (res.confirm) {
								console.log('用户点击确定')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
			}
		// }
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		var timestamp = Date.parse(new Date());
		var date = new Date(timestamp);
		//获取年份  
		var Y =date.getFullYear();
		//获取月份  
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		console.log("当前时间：" + Y + '年'  + M+ '月')
		//获取当日日期 
		var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
		let enddate = Y +'-'+ M +'-'+ D
		let date1 = Y +'年'+ M 
		console.log(enddate)
		that.setData({
			enddate:enddate,
			newdate:date1,
			newdate1:date1,
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