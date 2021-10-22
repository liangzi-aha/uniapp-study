// 同时发送异步代码的次数
let ajaxTimes = 0;
const baseUrl = 'http://localhost:8082';

export const request = function(params) {
	ajaxTimes++;

	// 加载框展示
	uni.showLoading({
		title: '加载中...',
		mask: true
	})

	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			url: baseUrl + params.url,
			success(res) {
				if (res.data.status !== 0) {
					uni.showToast({
						title: '获取数据失败'
					})
				} else {
					resolve(res.data);
				}
			},
			fail(err) {
				uni.showToast({
					title: '请求接口失败'
				});
				reject(err);
			},
			complete: () => {
				ajaxTimes--;
				if (ajaxTimes === 0) {
					// 关闭加载动画
					uni.hideLoading();
				}
			}
		})
	})
}
