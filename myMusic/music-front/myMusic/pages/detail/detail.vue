<template>
	<view class="detail">
		<view v-if="!isLoading" class="fixbg"
			:style="{ 'background-image': 'url(' + urlReplace(songDetail.musicImg) + ')' }"></view>
		<musichead :title="songDetail.musicName" :icon="true" color="white"></musichead>
		<view class="container" v-if="!isLoading">
			<scroll-view scroll-y="true">
				<view class="detail-play" @tap="handlePlay">
					<image :class="{ 'detail-play-run' : isPlayMusic}" :src="urlReplace(songDetail.musicImg)"></image>
					<text class="iconfont" :class="isPlayMusic ? 'icon-pause' : 'icon-bofang'"> </text>
					<view :class="{'pause-vidio' : !isPlayMusic}"></view>
				</view>
				<view class="detail-lyric" v-show="songLyric.length > 0">
					<view class="detail-lyric-wrap" :style="{'marginTop': -(lyricIndex-1) * 82 + 'rpx'}">
						<view class="detail-lyric-item" :class="{active : lyricIndex == index}" v-for="(item,index) in songLyric" :key="index">
							{{item.lyric}}
						</view>
					</view>
				</view>
				<bing-progress strokeWidth="5px" handleWidth="20px" :value="value"
					handleHeight="20px" handleColor="#aca2a2" noActiveColor="rgb(83,83,83)"
					activeColor="rgb(199,12,12)" :showInfo="false" handleBorderRadius="10px" @dragend="sliderChange" @dragstart="dragstart">
				</bing-progress>
				<!-- 操作 -->
				<view class="playMusic-play">
					<text :class="LoopPlayback ? 'iconfont icon-24gl-repeatOnce2' : 'iconfont icon-24gl-repeat2'"  @click="handleLoopPlayback"></text>
					<text class="iconfont icon-yduishangyiqu" @tap.stop="UpMusic()"></text>
					<text :class="isPlayMusic ? 'iconfont icon-pause' : 'iconfont icon-bofang'"
						@tap.stop="handlePlay()"></text>
					<text class="iconfont icon-yduixiayiqu" @tap.stop="nextMusic(songDetail.id)"></text>
					<text :class="isLoveMusic ? 'iconfont icon-aixin1 loveMusic' : 'iconfont icon-aixin'" @click="loveMusic"></text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import Token from '../../utils/token';
	export default {
		data() {
			return {
				// 歌曲详情
				songDetail: {
					musicImg: ''
				},
				// 是否播放状态
				isPlayMusic: true,
				// 接口是否加载完毕
				isLoading: true,
				baseImgUrl: this.$imgBaseUrl,
				value: 0,
				time: '',
				LoopPlayback: false, // 循环播放
				isLoveMusic: false,  // 是否添加到喜欢
				songLyric: [], // 歌词数组
				lyricIndex: 0, // 歌词下标
			}
		},
		onLoad(option) {
			this.getMusic(option.songId);
			// 播放下首歌曲方法放到原型上
			Vue.prototype.$nextMusic = function (musicId){
				uni.redirectTo({
					url: '/pages/detail/detail?songId=' + musicId
				})
			};
			// 判断是否循环播放
			const LoopPlayback = uni.getStorageSync('LoopPlayback');
			if(LoopPlayback){
				this.LoopPlayback = true;
			} else{
				this.LoopPlayback = false;
			}
		},
		onHide() {
			// 清除计时器
			this.clearTime();
		},
		onShow() {
			// 歌词计时器
			this.sliderInterval();
		},
		onUnload() {
			// 清除计时器
			this.clearTime();
		},
		methods: {
			// 获取歌曲详情 创建播放器
			getMusic(songId) {
				// 获取下一首歌曲id
				this.$getNextMusic(songId);
				this.lyricIndex = 0;

				this.isLoading = true;
				const { musicDetail, lyric } = this.$api;
				Promise.all([ lyric(songId),musicDetail(songId) ]).then(res=>{
					if(res[0].success && res[0].data){
						let lyric = res[0].data;
						// /[ :以"[ "开头 ():分组 [^\]]: 匹配除了 ] 之外的任意字符串
						let re = /\[([^\]]+)\]([^\[]+)/g;
						var result = [];
						lyric.replace(re,($0,$1,$2)=>{
							result.push({
								time: this.$formatTimeToSec($1),
								lyric: $2.replace(/\r\n/g,'')
							});
						});
						this.songLyric = result;
					} else{
						this.songLyric = [];
					}
					// 保存歌词
					uni.setStorageSync('lyric',this.songLyric);
					
					if(res[1].success){
						this.songDetail = res[1].data[0];
						uni.setStorage({
							key: 'songDetail',
							data: res[1].data[0]
						});
						
						this.$CreateBgAudioManager(
							this.songDetail.musicName,
							(status) => {
								this.isPlayMusic = status;
							},
							this.urlReplace(this.songDetail.musicUrl),
							this.urlReplace(this.songDetail.musicImg),
							this.sliderInterval,
							this.clearTime,
							this.nextMusic,
							this.UpMusic,
						)
						
						// 初始化音乐详情，请求当前播放是否为喜欢歌曲
						const token = uni.getStorageSync('userToken');
						if(token){
							const userId = Token.verify(token).data.id;
							this.playLoveMusic(userId,this.songDetail.id);
						}
					}
					this.isLoading = false;
				})
			},
			// 上一曲
			UpMusic(id) {
				// 清除计时器
				this.clearTime();
				// 播放进度条清0
				this.value = 0;
				const UpMusicId = uni.getStorageSync('UpMusicId');
				this.getMusic(UpMusicId);
			},
			// 下一曲
			nextMusic(id) {
				// 清除计时器
				this.clearTime();
				// 播放进度条清0
				this.value = 0;
				const nextMusicId = uni.getStorageSync('nextMusicId');
				this.getMusic(nextMusicId);
			},
			// 暂停 播放
			handlePlay() {
				if (this.$bgAudioManager.paused) {
					this.$bgAudioManager.play();
				} else {
					this.$bgAudioManager.pause();
				}
			},
			urlReplace(url) {
				return (this.baseImgUrl + url.replace(/\\/g, '/'))
			},
			// 手指接触进度条触发
			dragstart(){
				this.clearTime();
			},
			// 拖动音乐播放条回调
			sliderChange(data) {
				this.value = data.value;
				if(this.$bgAudioManager){
					const duration = this.$bgAudioManager.duration;
					this.$bgAudioManager.seek(this.value / 100 * duration);
					// 获取当前跳转进度
					let seek = this.value / 100 * duration;
					// 循环歌词
					for(let i = 0;i < this.songLyric.length;i++){
						// 当前播放时间大于 歌词的最后一个时间时
						if(seek > this.songLyric[this.songLyric.length - 1].time){
							this.lyricIndex = this.songLyric.length - 1;
							break;
						}
						// 当前歌曲播放时间大于第i个歌词的时间 且小于第i+1 个歌词时间 
						if(seek > this.songLyric[i].time && seek < this.songLyric[i+1].time){
							this.lyricIndex = i;
							break;
						}
					}
					// this.sliderInterval();
				}
			},
			// 计时器
			sliderInterval(){
				clearInterval(this.time);
				if(this.$bgAudioManager && !this.$bgAudioManager.paused){
					console.log('播放音乐计时器开始 + 进度条 + 歌词');
					// 音乐总时长
					const duration = this.$bgAudioManager.duration;
					// 音乐播放条 和 歌词计时器
					this.time = setInterval(()=>{
						// 当前时长 / 总时长 = 比例 * 100 = 进度条长度
						this.value = this.$bgAudioManager.currentTime / duration * 100;
						// 循环歌词
						for(let i = this.lyricIndex;i < this.songLyric.length;i++){
							// 当前播放时间大于 歌词的最后一个时间时
							if(this.$bgAudioManager.currentTime > this.songLyric[this.songLyric.length - 1].time){
								this.lyricIndex = this.songLyric.length - 1;
								break;
							}
							// 当前歌曲播放时间大于第i个歌词的时间 且小于第i+1 个歌词时间 
							if(this.$bgAudioManager.currentTime > this.songLyric[i].time && this.$bgAudioManager.currentTime < this.songLyric[i+1].time){
								this.lyricIndex = i;
								break;
							}
						}
					},500)
					
				}else{
					console.log('没播放音乐');
				}
			},
			// 清除音乐播放条的定时器
			clearTime(){
				clearInterval(this.time);
			},
			// 循环播放
			handleLoopPlayback(){
				this.LoopPlayback = !this.LoopPlayback;
				if(this.LoopPlayback){
					uni.setStorageSync('LoopPlayback',true)
				} else{
					uni.removeStorageSync('LoopPlayback')
				}
			},
			// 播放音乐是否为喜欢
			playLoveMusic(userId,musicId){
				const { playLoveMusic } = this.$api;
				playLoveMusic(userId,musicId).then(res=>{
					this.isLoveMusic = res.isLove;
				})
			},
			// 添加喜欢
			loveMusic(){
				const token = uni.getStorageSync('userToken');
				if(token){
					const { changeLoveMusic } = this.$api;
					const userId = Token.verify(token).data.id;
					// 修改当前播放歌曲喜欢状态
					changeLoveMusic(userId,this.songDetail.id).then(res=>{
						if(res.success){
							this.isLoveMusic = !this.isLoveMusic;
						}
					})
				} else{
					uni.navigateTo({
						url: '../login/login'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail {
		height: 100vh;
		.container{
			// #ifdef H5 || APP-PLUS
			height: calc(100vh - 75px);
			// #endif
			box-sizing: border-box;
			overflow: hidden;
			scroll-view {
				height: 100%!important;
				box-sizing: border-box;
			}
		}
		
		.detail-lyric{
			font-size: 32rpx;
			line-height: 82rpx;
			height: 246rpx;
			text-align: center;
			overflow: hidden;
			color: #6f6e73;
			margin-top: 40rpx;
			.detail-lyric-wrap{
				transform: 0.5s;
				.detail-lyric-item{
					height: 82rpx;
				}
				.active{
					color: white;
				}
			}
		}
		
		.detail-play {
			width: 580rpx;
			height: 580rpx;
			background: url(~@/static/disc.png);
			background-size: cover;
			margin: 214rpx auto 0;
			position: relative;

			image {
				border-radius: 50%;
				width: 370rpx;
				height: 370rpx;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				margin: auto;
				// css3关键帧动画
				animation: 10s linear move infinite;
				// 默认关闭动画
				animation-play-state: paused;
			}

			// 开始动画
			.detail-play-run {
				animation-play-state: running;
			}

			// 关键帧动画
			@keyframes move {
				from {
					transform: rotate(0deg);
				}

				to {
					transform: rotate(360deg);
				}
			}

			text {
				width: 100rpx;
				height: 100rpx;
				font-size: 100rpx;
				color: white;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				margin: auto;
			}

			.pause-vidio {
				transform: rotate(-20deg);
			}

			view {
				width: 230rpx;
				height: 360rpx;
				background: url(../../static/needle.png);
				position: absolute;
				left: 100rpx;
				right: 0;
				top: -200rpx;
				margin: auto;
				background-size: cover;
				transform: 0.5s;
				transform-origin: 10rpx 20rpx;
			}
		}

		.playMusic-play {
			padding: 50rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.loveMusic{
				color: #b84343;
			}
			text {
				font-size: 60rpx;
				margin: 0 35rpx;
			}
			text:nth-child(3){
				font-size: 90rpx;
			}
		}
	}
</style>
s
