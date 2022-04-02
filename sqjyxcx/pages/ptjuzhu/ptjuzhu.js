// pages/ptjuzhu/ptjuzhu.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		jzlist:[
			{name:'张三',sex:'女',age:29,idcard:'431223199809071234',cell:'12345678901',local:'湖南省长沙市岳麓区',id:0},
			{name:'张四',sex:'女',age:29,idcard:'431223199809071234',cell:'12345678901',local:'湖南省长沙市岳麓区',id:1},
			{name:'张五',sex:'女',age:29,idcard:'431223199809071234',cell:'12345678901',local:'湖南省长沙市岳麓区',id:2},
			{name:'张六',sex:'女',age:29,idcard:'431223199809071234',cell:'12345678901',local:'湖南省长沙市岳麓区',id:3},
		],
		rs:''
	},
	// 居住人数*
	jzrs(e){
		let val = e.detail.value
		this.setData({
			rs:val
		})
	},
	//添加居住人数
	tjjz(){
		wx.navigateTo({
			url: '/pages/djmesge/djmesge',
		})
	},
	// 删除居住人
	deleat(e){
		// console.log(e)
		let that = this
		let scid = e.currentTarget.dataset.id
		let jzlist = this.data.jzlist
		let arr = []
		for(let i=0;i<jzlist.length;i++){
			if(scid == jzlist[i].id){
				wx.showModal({
					title: '提示',
					content: '是否确认删除居住人信息',
					success (res) {
						if (res.confirm) {
							jzlist.splice(i, 1)
							that.setData({
								jzlist:jzlist
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
			}
		}
		console.log(jzlist.length)
	},
	//提交
	tijsq(){
		let rs = this.data.rs;
		// parseInt(this.data.rs)
		let jzlist = this.data.jzlist
		if(parseInt(this.data.rs) != jzlist.length){
			wx.showToast({
				title: '居住人信息与人数不符合！',
				icon: 'none',
				duration: 2000
			})
		} else{
			wx.redirectTo({
				url: '/pages/mesegsubmit/mesegsubmit',
			})
		}
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