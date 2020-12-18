// const BASE_URL = 'https://tianyudong.picp.vip'
const BASE_URL = 'http://127.0.0.1:3000'
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.status !== 201) {
					if (res.data.status == 407) {
						return uni.showModal({
							title: '提示',
							content: res.data.message + '，请完善基本信息',
							success: (res) => {
								if (res.confirm) {
									return uni.navigateTo({
										url:'/pages/teacher/basicInformation'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}else if(res.data.status == 406){
						return uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
					return uni.showToast({
						title: "获取数据失败",
						icon: 'none'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}
