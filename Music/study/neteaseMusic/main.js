import App from './App';
import { api } from './common/api.js'
import musichead from './components/musichead/musichead.vue';
import store from './store/index.js'
import MusicTabbar from './components/MusicTabbar/MusicTabbar.vue'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$nextMusic = '';
/**
 * 创建音乐播放器
 * @param {Object} name  歌曲名称
 * @param {Object} listenLyricIndex  歌词定时器
 * @param {Object} changeIsPlayMusic  改变播放状态
 * @param {Object} Url  歌曲url
 * @param {Object} picUrl   歌曲图片
 * @param {Object} getMusic  获取下一首歌曲
 */
Vue.prototype.$CreateBgAudioManager = function(name,listenLyricIndex,changeIsPlayMusic,Url,picUrl,cancelLyricIndex){
	let bgAudioManager = '';
	// #ifdef MP-WEIXIN
	bgAudioManager = uni.getBackgroundAudioManager();
	bgAudioManager.title = name;
	// #endif
	
	// #ifdef H5
	Vue.prototype.$bgAudioManager ? Vue.prototype.$bgAudioManager.destroy() : '';
	bgAudioManager = uni.createInnerAudioContext();
	changeIsPlayMusic(false);
	// #endif
	
	bgAudioManager.src = Url;
	bgAudioManager.coverImgUrl = picUrl;
	bgAudioManager.autoplay = true;
	
	bgAudioManager.onPlay(()=>{
		changeIsPlayMusic(true);
	})
	bgAudioManager.onPause(()=>{
		changeIsPlayMusic(false);
	})
	bgAudioManager.onEnded(()=>{
		// 結束清除計時器
		cancelLyricIndex();
		const nextMusicId = uni.getStorageSync('nextMusicId');
		Vue.prototype.$nextMusic(nextMusicId);
	})
	// 歌词检索
	listenLyricIndex();
	Vue.prototype.$bgAudioManager = bgAudioManager;
}

/**
 * 获取下首歌曲id和上一首歌曲id
 * @param {Object} playMusicId  当前播放歌曲id
 */
Vue.prototype.$getNextMusic = function(playMusicId){
	const trackIds = uni.getStorageSync('trackIds');
	for (var i = 0; i < trackIds.length; i++) {
		// 当前播放为列表最后一首
		if (trackIds[i].id == playMusicId && i == (trackIds.length-1)) {
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