// pages/qysearch/qysearch.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		compangjob: [
      {jobname: '服务员/保洁',usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
      name:'张三',tximg:'/img/tx.png',hxtime:'10分钟前',sqname:'天源社区', companyjuli: '1.2', },
      {jobname: '服务员/保洁',usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
      name:'李四',tximg:'/img/tx.png',hxtime:'10分钟前',sqname:'天源社区', companyjuli: '1.2', },
      {jobname: '服务员/保洁',usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
      name:'王二',tximg:'/img/tx.png',hxtime:'10分钟前',sqname:'天源社区', companyjuli: '1.2', },

    ],
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
		hidesx:true,
	},
	// 筛选事件
	sx(){
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx:hidesx
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