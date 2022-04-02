// pages/djmesge/djmesge.js
var IDCard = require('../../common/IDCard.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		region: ['请选择户籍地'],
		customItem: '',
		cor1:'',
		age:'',
		sex:'',
		array: ['请选择','高龄', '儿童', '军人', '特殊人群'],
		index: 0,
	},
	// 居住人姓名
	jzrxm(e){

	},
	// 身份证号码
	sfzhm(e){
		let age = IDCard.IdCard(e.detail.value, 3)
		let sex = IDCard.IdCard(e.detail.value, 2)
		// console.log(age + '--' + sex)
		this.setData({
			age:age,
			sex:sex
		})
		console.log(this.data.age)
	},
	// 电话号码
	dhhm(e){

	},
	// 户籍地
	bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
			region: e.detail.value,
			cor1:'#333'
    })
	},
	// 详细地址
	xxdz(e){

	},
	// 党员（单位）
	dydw(e){

	},
	//特殊人群
	bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
			index: e.detail.value,
			cor2:'#333'
			
    })
	},
	//备注
	bz(e){

	},
	//保存
	save(){
		wx.navigateTo({
			url: '/pages/mesegsubmit/mesegsubmit',
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