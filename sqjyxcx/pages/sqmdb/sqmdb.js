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

		items: [
      {value: 'zh', name: '住宅',tag:'jz'},
      {value: 'cc', name: '仓储',tag:'fjz'},
      {value: 'zz', name: '自住',tag:'jz'},
      {value: 'xfss', name: '消防设施',tag:'fjz'},
      {value: 'cz', name: '出租',tag:'jz'},
      {value: 'iswhb', name: '是否危/化/爆',tag:'fjz'},
      {value: 'bg', name: '办公',tag:'fjz'},
      {value: 'shy', name: '三合一场所',tag:'fjz'},
      {value: 'gt', name: '个体',tag:'fjz'},
      {value: 'zf', name: '做饭',tag:'fjz'},
      {value: 'gs', name: '公司',tag:'fjz'},
      {value: 'rhhj', name: '人货混居',tag:'fjz'},
		],
		itemsarr:[],
		flag:'',
		items1: [
      {value: 'zh', name: '电动车'},
      {value: 'cc', name: '中央空调'},
      {value: 'zz', name: '地暖' },
      {value: 'xfss', name: '烧炭' },
      {value: 'cz', name: '空调' },
      {value: 'iswhb', name: '电烤炉' },
      {value: 'bg', name: '天然气' },
      {value: 'shy', name: '强排型热水器' },
      {value: 'gt', name: '液化气' },
      {value: 'zf', name: '直排型热水器' },
      {value: 'gs', name: '电磁炉' },
      {value: 'rhhj', name: '电热水器' },
		],
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
	dhhm(e){

	},
	// 房屋用途*
	checkboxChange(e) {
		// console.log(e.detail.value)
		
		// console.log(e)
    const items = this.data.items
		const values = e.detail.value
		let itemsarr = this.data.itemsarr
		this.setData({
			itemsarr:e.detail.value
		})
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
			items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
					items[i].checked = true
          break
        }
      }
    }
		console.log(this.data.itemsarr)
	},
	// 安全情况（可多选）*
	checkboxChange1(e) {
		// console.log(e.detail.value)
		
		// console.log(e)
    const items = this.data.items1
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
	},
	next(){
		let itemsarr = this.data.itemsarr
		let flag = this.data.flag
		for(let i = 0;i<itemsarr.length;i++){
			if(itemsarr[i]=='zh' || itemsarr[i]=='zz' || itemsarr[i]=='cz'){
				flag = 'zj'
			}else if(itemsarr[i]!='cz' || itemsarr[i]!='zz' || itemsarr[i]!='zh'){
				flag = 'fzj'
			}else if(itemsarr[i] == ''){
				flag = ''
			}
		}
		// console.log(flag)
		if(flag == 'zj'){
			wx.navigateTo({
				url: '/pages/ptjuzhu/ptjuzhu',
			})
		}else if(flag == 'fzj'){
			wx.navigateTo({
				url: '/pages/comjuzhu/comjuzhu',
			})
		}else if(flag == ''){
			wx.showToast({
				title: '请选择房屋用途',
				icon: 'error',
				duration: 2000
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