import { baseUrl } from './config.js'

let reqNum = 0;
// 封装请求函数，做一些统一处理
function request(params){
	reqNum++;
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:"加载中..."
		});
		
		uni.request({
			...params,
			url: `${baseUrl}` +  params.url,
			success: (res) => {
				if(res.data.code === 200){
					resolve(res.data);
				}else{
					uni.showToast({
						title:'接口请求失败'
					})
				}
			},
			fail: (err) => {
				reject(err);
				uni.showToast({
					title:'接口请求失败'
				})
			},
			complete:()=>{
				reqNum--;
				if(reqNum === 0){
					// 关闭加载动画
					uni.hideLoading();
				}
			}
		})
	})
}


// 这里接口全部放在这里是想做接口的统一管理
export const api = {
	// 首页list
	topList: ()=>{
		return request({
			url:`/toplist/detail`,
		});
	},
	// 歌单
	playlist:(listId)=>{
		return request({
			url:`/playlist/detail?id=${listId}`,
		});
	},
	songDetail:(songId)=>{
		return request({
			url:`/song/detail?ids=${songId}`,
		});
	},
	songSimi:(songId)=>{
		return request({
			url:`/simi/song?id=${songId}`,
		});
	},
	songComment:(songId)=>{
		return request({
			url:`/comment/music?id=${songId}`,
		});
	},
	songLyric:(songId)=>{
		return request({
			url:`/lyric?id=${songId}`,
		});
	},
	songUrl:(songId)=>{
		return request({
			url:`/song/url?id=${songId}`,
		});
	},
	searchHot:()=>{
		return request({
			url:`/search/hot/detail`,
		});
	},
	searchWord:(word)=>{
		return request({
			url:`/search?keywords=${word}`,
		});
	},
	searchSuggest:(word)=>{
		return request({
			url:`/search/suggest?keywords=${word}&type=mobile`,
		});
	},
}