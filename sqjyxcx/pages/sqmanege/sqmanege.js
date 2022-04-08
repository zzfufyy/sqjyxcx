// pages/sqmanege/sqmanege.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// sqname:'东湖社区 ',
		sqlist:[
			{xqname:'东湖新寓',ld:'8',lc:'31',hs:'8',ydj:'1234',ydj:'1200',ry:'暂未分配'},
			{xqname:'东湖新寓1',ld:'8',lc:'31',hs:'8',ydj:'1234',ydj:'1200',ry:'张三'},
		],
		showfp:true,
		items: [
      {value: 'zs', name: '张三'},
      {value: 'ls', name: '李四'},
      {value: 'wr', name: '王二'},
      {value: 'mz', name: '麻子'},
      {value: 'lw', name: '龙五'},
      {value: 'lr', name: '路人'},
    ]
	},
	// 添加小区
	addxq(){
		wx.navigateTo({
			url: '/pages/addxq/addxq',
		})
	},
	//分配管理
	fpgl(){
		let showfp = !this.data.showfp
		this.setData({
			showfp:showfp
		})
	},
	wglrxq(){
		wx.navigateTo({
			url: '/pages/wglrxq/wglrxq',
		})
	},
	change(e){
		console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    this.setData({
      items
    })
	},
	radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
	},
	tijsq(){
		let showfp = !this.data.showfp
		let that = this
		wx.showToast({
			title: '分配成功',
			icon: '',
			duration: 2000,
			success () {
				that.setData({
					showfp:showfp
				})
			}
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