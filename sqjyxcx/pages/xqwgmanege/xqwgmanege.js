// pages/wglrxq/wglrxq.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		sqname:'东湖社区 ',
		seatings: [
			{fjh:[{fj:1101,isdj:true,isptjz:true},{fj:1102,isdj:false},{fj:1103,isdj:false},{fj:1104,isdj:false},{fj:1105,isdj:false},{fj:1106,isdj:false}]},
			{fjh:[{fj:1201,isdj:false},{fj:1202,isdj:false},{fj:1203,isdj:false,havexx:true},{fj:1204,isdj:false},{fj:1205,isdj:false},{fj:1206,isdj:true,isptjz:false}]},
			{fjh:[{fj:1301,isdj:false},{fj:1302,isdj:false},{fj:1303,isdj:false},{fj:1304,isdj:false},{fj:1305,isdj:false},{fj:1306,isdj:false}]},
			{fjh:[{fj:1401,isdj:false},{fj:1402,isdj:false},{fj:1403,isdj:false},{fj:1404,isdj:false},{fj:1405,isdj:false},{fj:1406,isdj:false},{fj:1407,isdj:false}]},
		],
		sqds:'东湖新寓1栋',
		selectedIndex: ['当前未选择房号，新增新的房号 >'],
		showIndex:'',
		zt:0,
		yxyq: [
			{ yxmoney: '全部', id: 0 }, { yxmoney: '未登记', id: 1 }, { yxmoney: '已登记', id: 2 }
		],
		ydjsj: [
			{ yxmoney: '不限', id: 0 }, { yxmoney: '本日', id: 1 }, { yxmoney: '本月', id: 2 }
		],
		xxdj:'',
		xxydj:'',
		hidesx: true,
		qdhide:true,
		searchval:'',
		hidesqxz:true,

		sjLeftItems: [
			{ typename: '芙蓉区', typeid: 0 },
			{ typename: '天心区', typeid: 1 },
			{ typename: '岳麓区', typeid: 2 },
			{ typename: '开福区', typeid: 3 },
			{ typename: '雨花区', typeid: 4 },
			{ typename: '望城区', typeid: 5 },
		],
		sjRightItems: [
			{ typename: '芙蓉区', typelist: [{ childname: '街道一', id: 0 }, { childname: '街道2', id: 1 }, { childname: '街道1', id: 2 }], typeid: 0 },
			{ typename: '天心区', typelist: [{ childname: '街道一', id: 3 }, { childname: '街道2', id: 4 }, { childname: '街道1', id: 5 }], typeid: 1 },
			{ typename: '岳麓区', typelist: [{ childname: '街道一', id: 6 }, { childname: '街道2', id: 7 }, { childname: '街道1', id: 8 }], typeid: 2 },
			{ typename: '开福区', typelist: [{ childname: '街道一', id: 9 }, { childname: '街道2', id: 10 }, { childname: '街道1', id: 11 }], typeid: 3 },
			{ typename: '雨花区', typelist: [{ childname: '街道一', id: 12 }, { childname: '街道2', id: 13 }, { childname: '街道1', id: 14 }], typeid: 4 },
			{ typename: '望城区', typelist: [{ childname: '街道一', id: 15 }, { childname: '街道2', id: 16 }, { childname: '街道1', id: 17 }], typeid: 5 },
		],
		curNav: 1,
		id: 1,
		occid:'',
	},
	//筛选
	sxbtn(){
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	// 搜索
	searchjob(e){
		let val = e.detail.value
		let searchval = this.data.searchval
		if(val != ''){
			this.setData({
				qdhide:false,
				searchval:val
			})
		}else{
			this.setData({
				qdhide:true
			})
		}
	},
	//确定搜索
	qudssbtn(){
		let that = this
		let searchval = that.data.searchval
		console.log(searchval)
		let hidesx = !that.data.hidesx
		that.setData({
			showIndex:searchval,
			hidesx: hidesx,
		})
	},
	// 收起
	sx(){
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	//信息是否登记
	yxxz(e){
		let id = e.currentTarget.dataset.id
		this.setData({
			xxdj:id
		})
	},
	// 已登记户事件
	ydjsj(e){
		let id = e.currentTarget.dataset.id
		this.setData({
			xxydj:id
		})
	},
	//清空
	clear() {
		this.setData({
			xxdj:0,
			xxydj:0
		})
	},
	//确定
	qd() {
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	// 未登记选择
	choose(e) {
		let selectedIndex = this.data.selectedIndex
		if (e.currentTarget.dataset.index != this.data.showIndex) {
			let nav = '东湖新寓1栋'+e.currentTarget.dataset.nav
			selectedIndex.splice(0,1,nav)
			console.log(selectedIndex)
			this.setData({
				showIndex: e.currentTarget.dataset.index,
				selectedIndex:selectedIndex,
				zt:1
			})
		} else {
			selectedIndex = ['当前未选择房号，新增新的房号 >']
			this.setData({
				showIndex: 0,
				selectedIndex:selectedIndex,
				zt:0
			})
		}
	},
	//登记事件
	// godj(){
	// 	wx.navigateTo({
	// 		url: '/pages/sqmdb/sqmdb',
	// 	})
	// },
	// 已登记点击
	ydjbtn(e){
		
		let selectedIndex = this.data.selectedIndex
		let nav = '东湖新寓1栋'+e.currentTarget.dataset.nav
		selectedIndex.splice(0,1,nav)
		console.log(e.currentTarget.dataset.ptjz)
		let ptjz = e.currentTarget.dataset.ptjz
		wx.showModal({
			title: '提示',
			content: selectedIndex + '已登记信息 是否查看信息？',
			confirmText:'去查看',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
					if(ptjz == true){
						wx.navigateTo({
							url: '/pages/checkxx/checkxx',
						})
					}else{
						wx.navigateTo({
							url: '/pages/isshyjz/isshyjz',
						})
					}
					
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	//社区选择
	sqchoose(){
		let hidesqxz = !this.data.hidesqxz
		this.setData({
			hidesqxz:hidesqxz
		})
	},
	// 社区选择--左边小区选择
	switchRightTab1: function (e) {
		// 获取item项的id，和数组的下标值
		let id = e.target.dataset.id;
		console.log(e)
		let index = parseInt(e.target.dataset.index1);
		// 把点击到的某一项，设为当前index
		this.setData({
			curNav1: id,
			curIndex1: index,
			toView1: id
		})
	},
	// 社区选择--右边栋数
	choselocal(e) {
		let hidesqxz = !this.data.hidesqxz
		console.log(e)
		this.setData({
			hidesqxz:hidesqxz,
			curentid:e.currentTarget.dataset.id,
		})
	},
	//社区选择点击遮罩层关闭
	hidethis(){
		let hidesqxz = !this.data.hidesqxz
		this.setData({
			hidesqxz:hidesqxz
		})
	},
	//删除房号
	dletthis(e){
		let selectedIndex = this.data.selectedIndex
		let nav = '东湖新寓1栋'+e.currentTarget.dataset.nav
		// selectedIndex.splice(0,1,nav)
		console.log(selectedIndex)
		wx.showModal({
			title: '提示',
			content: selectedIndex + '是否确定删除？',
			confirmText:'确定',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
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
		let that = this
		let gradeOne_new = []
		for(let i=0;i<that.data.seatings.length;i++){
			let lgh = that.data.seatings[i].fjh.length
			gradeOne_new.push(lgh)
		}
		console.log(Math.max(...gradeOne_new))
		//最大值
		let max = Math.max(...gradeOne_new)
		that.setData({	
			wd:max*57
		})

		wx.getSystemInfo({
			success: (res) => {
				console.log(res)
				let windowHeight = res.windowHeight;
				let wht = windowHeight * 0.8 - 86
				let oht = wht;
				that.setData({
					oht: oht
				})
			},
		});
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