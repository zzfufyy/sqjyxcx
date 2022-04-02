// pages/sqmdb/sqmdb.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		array: ['请选择小区','东湖小区', '小区二'],
		index: 0,
		array1: ['请选择楼栋','东湖小区', '小区二'],
		index1: 0,
		array2: ['请选择楼层','东湖小区', '小区二'],
		index2: 0,
		array3: ['请选择房号','东湖小区', '小区二'],
		index3: 0,
		array4: ['1','2', '3'],
		index4: 0,
		array5: ['1','2', '3'],
		index5: 0,
	},
	//小区*
	bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
			index: e.detail.value,
			
    })
	},
	//楼栋*
	bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
			index1: e.detail.value,
			
    })
	},
	//楼层*
	bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
			index2: e.detail.value,
			
    })
	},
	//房间号*
	bindPickerChange3: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
			index3: e.detail.value,
			
    })
	},
	//室*
	bindPickerChange4: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
			index4: e.detail.value,
			
    })
	},
	//厅*
	bindPickerChange5: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
			index5: e.detail.value,
			
    })
	},
	// 房主电话号码
	//备注
	dhhm(e){

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