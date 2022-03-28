// pages/manegejob/manegejob.js
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
		dck:[
			{date:'3月9日',list:[
				{name:'张三',sex:'女',year:'24',workyear:'1-3',jyzt:'待业',ypzw:'清洁工',cellphne:'13112345678',ckid:'0'},
				{name:'张三',sex:'女',year:'24',workyear:'1-3',jyzt:'待业',ypzw:'清洁工',cellphne:'13212345678',ckid:'1'},
				{name:'张三',sex:'女',year:'24',workyear:'1-3',jyzt:'待业',ypzw:'清洁工',cellphne:'13212345678',ckid:'2'},
			]},
			{date:'3月10日',list:[
				{name:'张三',sex:'女',year:'24',workyear:'1-3',jyzt:'待业',ypzw:'清洁工',cellphne:'13112345678',ckid:'3'},
				{name:'张三',sex:'女',year:'24',workyear:'1-3',jyzt:'待业',ypzw:'清洁工',cellphne:'13212345678',ckid:'4'},
			]},
			
		],
		gtz:[{date:'3月9日',list:[
			{name:'李四',sex:'女',year:'24',workyear:'1-3',jyzt:'待业',ypzw:'清洁工',cellphne:'13112345678',ckid:'2'},
			{name:'李四',sex:'女',year:'24',workyear:'1-3',jyzt:'待业',ypzw:'清洁工',cellphne:'13212345678',ckid:'3'}]}
		],
		buheshi:[
			{date:'3月9日',list:[{name:'王五',sex:'女',year:'24',workyear:'1-3',jyzt:'待业',ypzw:'清洁工',cellphne:'13112345678',ckid:'4'}]},
		],
		ident:"company",

		// 弹窗
		sxkz:true,
		// 月薪要求
		yxyq:[
			{yxmoney:'不限',id:0,checked:true},{yxmoney:'2千以下',id:1},{yxmoney:'2千-3千',id:2},{yxmoney:'3千-4千',id:3},{yxmoney:'4千-5千',id:4},{yxmoney:'5千-7千',id:5},{yxmoney:'7千-1万',id:6},{yxmoney:'1万-1.5万',id:7}
		],
		index:'',

		// 年龄范围
		nyxz:[
			{nl:'不限',id:0,checked:true},{nl:'20-30岁',id:1},{nl:'30-40岁',id:2},{nl:'40-50岁',id:3},{nl:'50-60岁',id:4},
		],
		// 工作经验
		gzjy:[
			{jy:'不限',id:0,checked:true},{jy:'1-3年',id:1},{jy:'3-5年',id:2},{jy:'5-10年',id:3},{jy:'10年以上',id:4},
		],
		hidesx:true
	},
	// 筛选事件
	sx(){
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx:hidesx
		})
	},
	//月薪选择
	yxxz(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.yxyq.length; i++) {
      if (this.data.yxyq[i].id == id) {
        if (this.data.yxyq[i].checked == true) {
          this.data.yxyq[i].checked = false;
        } else {
          this.data.yxyq[i].checked = true;
        }
      }
    }
    this.setData({
      yxyq: this.data.yxyq
    })
	},
	//年龄范围
	nlfw(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.nyxz.length; i++) {
      if (this.data.nyxz[i].id == id) {
        if (this.data.nyxz[i].checked == true) {
          this.data.nyxz[i].checked = false;
        } else {
          this.data.nyxz[i].checked = true;
        }
      }
    }
    this.setData({
      nyxz: this.data.nyxz
    })
	},
	//工作经验
	gzjy(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.gzjy.length; i++) {
      if (this.data.gzjy[i].id == id) {
        if (this.data.gzjy[i].checked == true) {
          this.data.gzjy[i].checked = false;
        } else {
          this.data.gzjy[i].checked = true;
        }
      }
    }
    this.setData({
      gzjy: this.data.gzjy
    })
	},
	//清空
	clear(){
		for (let i = 0; i < this.data.yxyq.length; i++) {
      this.data.yxyq[i].checked = false;
		}
		for (let i = 0; i < this.data.nyxz.length; i++) {
      this.data.nyxz[i].checked = false;
		}
		for (let i = 0; i < this.data.gzjy.length; i++) {
      this.data.gzjy[i].checked = false;
		}
		this.setData({
      yxyq: this.data.yxyq,
      nyxz: this.data.nyxz,
      gzjy: this.data.gzjy,
    })
	},
	//确定
	qd(){
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx:hidesx
		})
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
	//聊一聊
	talk(){
		let that = this
		let ident = that.data.ident
		wx.navigateTo({
			url: '/pages/talkjobcom/talkjobcom?userident='+ ident ,
		})
	},
	//待查看打电话
	call(e){
		let that = this
		let phonenum = e.currentTarget.dataset.cellphne
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
		})
	},
	//沟通中打电话
	callnum(e){
		let that = this
		let buheshi = that.data.buheshi
		let phonenum = e.currentTarget.dataset.cellphne
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
		})
	},
	//不合适打电话
	bhscall(e){
		let that = this
		let phonenum = e.currentTarget.dataset.cellphne
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
			success(res){
			}
		})
	},
	//待查看不合适点击事件
	bhs(e){
		
	},
	//沟通中不合适点击事件
	gtzbhs(e){
		
	},
	//待查看聊一聊
	dcktalk(e){
		let that = this
		let xiajiaid = e.currentTarget.dataset.ckid
		let dck = that.data.dck
		let gtz = that.data.gtz
		let buheshi = that.data.buheshi
		console.log(e)
		for(let i = 0;i<dck.length;i++){
			if(xiajiaid == dck[i].ckid){
				wx.showModal({
					title: '提示',
					content: '是否确认沟通',
					success (res) {
						if (res.confirm) {
							console.log("000")

							gtz.push(dck[i])
							dck.splice(i, 1)
							let section1 = [
								{name: '待查看',typeId: '0',num:dck.length}, 
								{name: '沟通中',typeId: '1',num:gtz.length},
								{name: '不合适',typeId: '2',num:buheshi.length},
							]
							that.setData({
								dck:dck,
								gtz:gtz,
								section:section1
							})
							let ident = that.data.ident
							wx.navigateTo({
								url: '/pages/talkjobcom/talkjobcom?userident='+ ident ,
							})
							
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
			}
		}
		let section1 = [
			{name: '待查看',typeId: '0',num:dck.length}, 
			{name: '沟通中',typeId: '1',num:gtz.length},
			{name: '不合适',typeId: '2',num:buheshi.length},
		]
		that.setData({
			dck:dck,
			buheshi:buheshi,
			section:section1
		})
	},
	//不合适聊一聊
	bhstalk(e){
		let that = this
		let xiajiaid = e.currentTarget.dataset.ckid
		let dck = that.data.dck
		let gtz = that.data.gtz
		let buheshi = that.data.buheshi
		for(let i = 0;i<buheshi.length;i++){
			if(xiajiaid == buheshi[i].ckid){
				wx.showModal({
					title: '提示',
					content: '是否确认沟通',
					success (res) {
						if (res.confirm) {
							gtz.push(buheshi[i])
							buheshi.splice(i, 1)
							let section1 = [
								{name: '待查看',typeId: '0',num:dck.length}, 
								{name: '沟通中',typeId: '1',num:gtz.length},
								{name: '不合适',typeId: '2',num:buheshi.length},
							]
							that.setData({
								buheshi:buheshi,
								gtz:gtz,
								section:section1
							})
							let ident = that.data.ident
							wx.navigateTo({
								url: '/pages/talkjobcom/talkjobcom?userident='+ ident ,
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}
			
		}
		let section1 = [
			{name: '待查看',typeId: '0',num:dck.length}, 
			{name: '沟通中',typeId: '1',num:gtz.length},
			{name: '不合适',typeId: '2',num:buheshi.length},
		]
		that.setData({
			gtz:gtz,
			buheshi:buheshi,
			section:section1
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight,
				});
			}
		})
		let dck = 0
		let gtz = 0
		let buheshi = 0
		for(let i=0;i<that.data.dck.length;i++){
			dck += that.data.dck[i].list.length 
		}
		for(let q=0;q<that.data.gtz.length;q++){
			gtz += that.data.gtz[q].list.length 
		}
		for(let w=0;w<that.data.buheshi.length;w++){
			buheshi += that.data.buheshi[w].list.length 
		}


		let section1 = [
			{name: '待查看',typeId: '0',num:dck}, 
			{name: '沟通中',typeId: '1',num:gtz},
			{name: '不合适',typeId: '2',num:buheshi},
		]
		that.setData({
			section:section1
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