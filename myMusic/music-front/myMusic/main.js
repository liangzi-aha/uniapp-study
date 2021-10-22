import App from './App';
import { api } from './common/api.js'
import musichead from './components/musichead/musichead.vue';
import store from './store/index.js'
import MusicTabbar from './components/MusicTabbar/MusicTabbar.vue';
import w_md5 from "js_sdk/zww-md5/w_md5.js";


// #ifndef VUE3
import Vue from 'vue';
// main.js
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$nextMusic = '';  // nextMusic 为不同页面传入不同方法
Vue.prototype.$imgBaseUrl = 'http://47.102.107.202:8080/';  // 47.102.107.202:8080  192.168.0.105:5588
Vue.prototype.$w_md5 = w_md5;
/**
 * 创建音乐播放器
 * @param {Object} name  歌曲名称
 * @param {Object} changeIsPlayMusic  改变播放状态
 * @param {Object} Url  歌曲url
 * @param {Object} picUrl   歌曲图片
 * @param {Object} getMusic  获取下一首歌曲
 */
Vue.prototype.$CreateBgAudioManager = function(name,changeIsPlayMusic,Url,picUrl,sliderInterval,clearTime,nextMusic,UpMusic){
	
	let bgAudioManager = '';
	// #ifdef MP-WEIXIN || APP-PLUS
	bgAudioManager = uni.getBackgroundAudioManager();
	bgAudioManager.title = name;
	// #endif
	
	// #ifdef H5
	Vue.prototype.$bgAudioManager ? Vue.prototype.$bgAudioManager.destroy() : '';
	bgAudioManager = uni.createInnerAudioContext();
	changeIsPlayMusic(false);
	// #endif
	
	uni.showLoading({
		title:"数据加载中...",
		mask: true
	});
	
	bgAudioManager.src = Url;
	bgAudioManager.coverImgUrl = picUrl;
	bgAudioManager.autoplay = true;
	
	bgAudioManager.onPlay(()=>{
		console.log('播放');
		uni.hideLoading();
		clearTime();
		changeIsPlayMusic(true);
		sliderInterval();
	})
	bgAudioManager.onPause(()=>{
		changeIsPlayMusic(false);
		clearTime();
	})
	bgAudioManager.onError((err)=>{
		changeIsPlayMusic(false);
		clearTime();
		uni.hideLoading();
		uni.showToast({
			title: err.errMsg,
			mask: true,
			icon: 'error'
		});
		console.log('播放错误:',err);
	})
	// #ifdef APP-PLUS || MP-WEIXIN
	// 系统上一首
	bgAudioManager.onPrev(()=>{
		UpMusic();
	})
	// 系统下一曲
	bgAudioManager.onNext(()=>{
		nextMusic();
	})
	// #endif
	// 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
	bgAudioManager.onWaiting(()=>{
		console.log('音频加载中事件，当音频因为数据不足，需要停下来加载时会触发');
		clearTime();
	})
	// 背景音频进入可以播放状态，但不保证后面可以流畅播放
	bgAudioManager.onCanplay(()=>{
		console.log('背景音频进入可以播放状态，但不保证后面可以流畅播放');
		uni.hideLoading();
		sliderInterval();
	})
	bgAudioManager.onEnded(()=>{
		clearTime();
		let nextMusicId;
		// 判断本地是否存有循环id
		const LoopPlayback = uni.getStorageSync('LoopPlayback');
		if(LoopPlayback){
			nextMusicId = uni.getStorageSync('songDetail').id;
		} else{
			nextMusicId = uni.getStorageSync('nextMusicId');
		}
		Vue.prototype.$nextMusic(nextMusicId);
	})
	Vue.prototype.$bgAudioManager = bgAudioManager;
}

/**
 * 获取下首歌曲id和上一首歌曲id
 * @param {Object} playMusicId  当前播放歌曲id
 */
Vue.prototype.$getNextMusic = function(playMusicId){
	const trackIds = uni.getStorageSync('trackIds');
	for (var i = 0; i < trackIds.length; i++) {
		// 只有一首歌
		if(trackIds.length == 1){
			uni.setStorageSync('nextMusicId',trackIds[0].id);
			uni.setStorageSync('UpMusicId',trackIds[0].id);
			break;
		// 当前播放为列表最后一首
		}else if (trackIds[i].id == playMusicId && i == (trackIds.length-1)) {
			uni.setStorageSync('nextMusicId',trackIds[0].id);
			uni.setStorageSync('UpMusicId',trackIds[trackIds.length - 2].id);
			break;
		// 当前播放为列表第一首，上一曲播放最后一首
		} else if(trackIds[i].id == playMusicId && i == 0){
			uni.setStorageSync('nextMusicId',trackIds[i + 1].id);
			uni.setStorageSync('UpMusicId',trackIds[trackIds.length - 1].id);
			break;
		} else if(trackIds[i].id == playMusicId){
			uni.setStorageSync('nextMusicId',trackIds[i + 1].id);
			uni.setStorageSync('UpMusicId',trackIds[i - 1].id);
			break;
		}
	}
}

// 歌词时间格式化
Vue.prototype.$formatTimeToSec = function (value){
	let arr =  value.split(':');
	return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1)
}

// 注册全局组件
Vue.component('musichead',musichead);
Vue.component('MusicTabbar',MusicTabbar);
// 处理点赞数字过大
Vue.filter('formatCount',(num)=>{
	if(num > 100000000){
		return (num / 100000000).toFixed(1) + '亿'
	}
	if(num > 10000 && num < 100000000){
		return (num / 10000).toFixed(1) + '万'
	}
	return num;
});
// 时间戳格式化
Vue.filter('formatTime',(value)=>{
	var date = new Date(value);
	return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
});

App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif