import { baseUrl } from './config.js'

let reqNum = 0;
// 封装请求函数，做一些统一处理
function request(params){
	reqNum++;
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:"加载中...",
			mask: true
		});
		
		uni.request({
			...params,
			url: `${baseUrl}` +  params.url,
			success: (res) => {
				console.log(res)
				if(res.data.success){
					resolve(res.data);
				}else{
					uni.showToast({
						title: res.data.message
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
	classifyList: ()=>{
		return request({
			url:`/classifyList`,
			method: 'post',
		});
	},
	// 分类详情
	classifyMessage:(id)=>{
		return request({
			url:`/classifyMessage`,
			method: 'post',
			data: {
				id: id
			}
		});
	},
	// 获取分类下音乐
	classifyMusic:(idList)=>{
		return request({
			url:`/classifyMusic`,
			method: 'post',
			data: {
				idList: idList
			}
		});
	},
	// 音乐详情
	musicDetail:(songId)=>{
		return request({
			url:`/musicDetail`,
			method: 'post',
			data: {
				id: songId
			}
		});
	},
	// 获取歌词
	lyric:(songId)=>{
		return request({
			url:`/lyric`,
			method: 'post',
			data: {
				id: songId
			}
		});
	},
	// 查询搜索关键字
	searchKey:(search)=>{
		return request({
			url:`/searchKey`,
			method: 'post',
			data: {
				search
			}
		});
	},
	// 获取搜索热门
	searchHot:()=>{
		return request({
			url:`/searchHot`,
			method: 'post',
		});
	},
	// 搜索音乐
	searchMusic:(search)=>{
		return request({
			url:`/searchMusic`,
			method: 'post',
			data: {
				search
			}
		});
	},
	// 音乐搜索数量
	searchNum: (id)=>{
		return request({
			url:`/searchNum`,
			method: 'post',
			data: {
				id
			}
		});
	},
	// 登录
	login: (userName,password)=>{
		return request({
			url:`/login`,
			method: 'post',
			data: {
				userName,
				password
			}
		});
	},
	// 注册
	register: (userName,password)=>{
		return request({
			url:`/register`,
			method: 'post',
			data: {
				userName,
				password
			}
		});
	},
	// 音乐列表
	song_list: (userId)=>{
		return request({
			url:`/song_list`,
			method: 'post',
			data: {
				userId
			}
		});
	},
	// 获取喜欢音乐
	loveMusic: (userId)=>{
		return request({
			url:`/loveMusic`,
			method: 'post',
			data: {
				userId
			}
		});
	},
	// 当前播放歌曲是否为喜欢
	playLoveMusic: (userId,musicId)=>{
		return request({
			url:`/playLoveMusic`,
			method: 'post',
			data: {
				userId,
				musicId
			}
		});
	},
	// 修改当前播放歌曲的喜欢状态
	changeLoveMusic: (userId,musicId)=>{
		return request({
			url:`/changeLoveMusic`,
			method: 'post',
			data: {
				userId,
				musicId
			}
		});
	},
	// 添加歌单
	addSongList: (userId, songListName)=>{
		return request({
			url:`/addSongList`,
			method: 'post',
			data: {
				userId, 
				songListName
			}
		});
	},
	// 删除歌单
	delSongList: (songListId)=>{
		return request({
			url:`/delSongList`,
			method: 'post',
			data: {
				songListId
			}
		});
	},
	// 歌曲添加到歌单
	addMusicToSongList: (musicId, SongListId)=>{
		return request({
			url:`/addMusicToSongList`,
			method: 'post',
			data: {
				musicId, 
				SongListId
			}
		});
	},
	// 获取歌单详情
	songListDetail: (songListId)=>{
		return request({
			url:`/songListDetail`,
			method: 'post',
			data: {
				songListId
			}
		});
	},
	// 删除歌单音乐
	delSongListMusic: (songListId,musicId)=>{
		return request({
			url:`/delSongListMusic`,
			method: 'post',
			data: {
				songListId,
				musicId
			}
		});
	},
}