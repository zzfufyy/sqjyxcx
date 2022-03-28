// pages/talkjobcom/talkjobcom.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		qzzxx:[
			{name:'Sara',sex:'女',year:'24',hy:'10分钟前活跃',gzyx:'保洁/服务员',money:'3000-5000',cellnum:'13112345678'}
		],
		ltlist:[
			{tximg:'/img/tx.png',comjz:'看了您的简历感觉很匹配，什么时间有空参加面试呢？',sf:'company',id:'0'},
			{tximg:'/img/tx.png',comjz:'我明天上午正好有空',sf:'qzz',id:'1'},
			{tximg:'/img/tx.png',comjz:'请问几点',sf:'qzz',id:'2'},
			{tximg:'/img/tx.png',comjz:'就九点吧',sf:'company',id:'3'},
		],
		ht:'',
		scrollTop:'',
		opacity:'',
		ident:'',

		compgs:[
			{name:'长沙星沙文和友餐饮文化管理有限公司',gzyx:'保洁/服务员',money:'3000-5000',rs:'10',cellnum:'13112345678'}
		],
		ltlistqzz:[
			{tximg:'/img/tx.png',comjz:'我对这个职位很感兴趣，希望您能看看我的简历，谢谢！',sf:'qzz',id:'0'},
			{tximg:'/img/tx.png',comjz:'看了您的简历感觉很匹配，什么时间有空参加面试呢？',sf:'company',id:'1'},
			{tximg:'/img/tx.png',comjz:'我明天上午正好有空',sf:'qzz',id:'2'},
			{tximg:'/img/tx.png',comjz:'就九点吧',sf:'company',id:'3'},
		],
		scrollTopqzz:'',
		opacityqzz:''
	},
	//发送消息--企业
	send(e){
		var val = e.detail.value;
		let oltlist = this.data.ltlist
		let id = oltlist.length
		// console.log(id)
		console.log(val)
		if(val != ''){
			let json = {
				tximg:'/img/tx.png',comjz:val,sf:'company',
			}
			oltlist.push(json)
			this.setData({
				ltlist:oltlist,
				scrollTop:id*95
			})
		}else{
			wx.showToast({
				title: '消息不能为空',
				icon:'none',
				duration: 2000
			})
		}
		
	},
	//看简历--企业
	checkjl(){
		wx.navigateTo({
			url: '/pages/loojl/lookjl',
		})
	},
	//打电话--企业
	cellnum(e){
		let that = this
		let phonenum = e.currentTarget.dataset.cellnum
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
		})
	},
	//不合适--企业
	buheshi(e){
		let that = this
		wx.showModal({
			title: '提示',
			content: '是否确认不合适',
			success (res) {
				that.setData({
					opacity:'0.5'
				})
			}
		})
		
	},

	//投递简历--求职者
	tdjl(e){
		wx.showModal({
			title: '提示',
			content: '是否投递简历',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	//发送消息--求职者
	sendmes(e){
		var val = e.detail.value;
		let oltlistqzz = this.data.ltlistqzz
		let id = oltlistqzz.length
		// console.log(id)
		console.log(val)
		if(val != ''){
			let json = {
				tximg:'/img/tx.png',comjz:val,sf:'qzz',
			}
			oltlistqzz.push(json)
			this.setData({
				ltlistqzz:oltlistqzz,
				scrollTopqzz:id*95
			})
		}else{
			wx.showToast({
				title: '消息不能为空',
				icon:'none',
				duration: 2000
			})
		}
		
	},
	//不合适--企业
	buheshiqzz(e){
		let that = this
		wx.showModal({
			title: '提示',
			content: '是否确认不合适',
			success (res) {
				that.setData({
					opacityqzz:'0.5'
				})
			}
		})
		
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		let that = this
		let ht = this.data.ht
		let oltlist = this.data.ltlist
		let ident = this.data.ident
		that.setData({
			ident:options.userident
		})
		let leng = oltlist.length
		// let listitemht = 89
		wx.getSystemInfo({
			success: (res) => {
				console.log(res)
				that.setData({
					ht:res.windowHeight - 64 - 43 - 10 - 70 - 65,
					scrollTop:leng*89,
				})
			}
		})
		// console.log(this.data.ident)
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