<template>
	<view class="playMusic" :style="{'height': showDetail ? '100%' : '0' }">
		<view class="fixed-music" :class="fixedButton ? 'playMusicFixed' : ''" @click="handleShowDetail()"
			:style="{ 'backgroundColor': showDetail ? '' : 'white' }">
			<view class="playMusic-img">
				<image mode="widthFix" :src="urlReplace(songDetail.musicImg)" :class="{ 'play-run' : isPlayMusic}">
				</image>
			</view>
			<view class="playMusic-name">
				{{ songDetail.musicName }}
			</view>
			<view class="playMusic-play_tabbar">
				<text class="iconfont icon-yduishangyiqu" @tap.stop="UpMusic()"></text>
				<text :class="isPlayMusic ? 'iconfont icon-pause' : 'iconfont icon-bofang'"
					@tap.stop="handlePlay()"></text>
				<text class="iconfont icon-yduixiayiqu" @tap.stop="nextMusic()"></text>
			</view>
		</view>


		<view class="playMusic-content">
			<view class="playMusic-content-head" @tap="showDetail = false">
				<text class="iconfont icon-zuojiantou"></text>
				<text>{{ songDetail.musicName }}</text>
			</view>
			<view class="fixbg" v-show="showDetail" :style="{ 'background-image': 'url(' + urlReplace(songDetail.musicImg) + ')' }"></view>
			<view class="container">
				<scroll-view scroll-y="true">
					<view class="play-music-detail" v-if="showDetail">
						
						<view class="detail-play" @tap="handlePlay">
							<image :class="{ 'detail-play-run' : isPlayMusic}" :src="urlReplace(songDetail.musicImg)">
							</image>
							<text class="iconfont" :class="isPlayMusic ? 'icon-pause' : 'icon-bofang'"> </text>
							<view :class="{'pause-vidio' : !isPlayMusic}"></view>
						</view>
					</view>
					<view class="detail-lyric" v-if="songLyric.length > 0">
						<view class="detail-lyric-wrap" :style="{'marginTop': -(lyricIndex-1) * 82 + 'rpx'}">
							<view class="detail-lyric-item" :class="{active : lyricIndex == index}" v-for="(item,index) in songLyric" :key="index">
								{{item.lyric}}
							</view>
						</view>
					</view>
					<bing-progress strokeWidth="5px" handleWidth="20px" :value="value" handleHeight="20px"
						handleColor="#aca2a2" noActiveColor="rgb(83,83,83)" activeColor="rgb(199,12,12)"
						:showInfo="false" handleBorderRadius="10px" @dragend="sliderChange" @dragstart="dragstart">
					</bing-progress>
					<!-- 操作 -->
					<view class="playMusic-play">
						<text :class="LoopPlayback ? 'iconfont icon-24gl-repeatOnce2' : 'iconfont icon-24gl-repeat2'"
							@click="handleLoopPlayback"></text>
						<text class="iconfont icon-yduishangyiqu" @tap.stop="UpMusic()"></text>
						<text :class="isPlayMusic ? 'iconfont icon-pause' : 'iconfont icon-bofang'"
							@tap.stop="handlePlay()"></text>
						<text class="iconfont icon-yduixiayiqu" @tap.stop="nextMusic()"></text>
						<text :class="isLoveMusic ? 'iconfont icon-aixin1 loveMusic' : 'iconfont icon-aixin'"
							@click="loveMusic"></text>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import Vue from 'vue';
	import Token from '../../utils/token';
	export default {
		name: "playMusic",
		data() {
			return {
				showDetail: false, // 音乐tabbar展开状态
				isPlayMusic: false, // 当前是否播放音乐
				iconPlay: '', // 播放iconfont
				songDetail: {}, // 播放音乐数据
				baseImgUrl: this.$imgBaseUrl,
				value: 0, // 播放进度条
				time: '', // 播放进度条计时器
				LoopPlayback: false, // 循环播放
				isLoveMusic: false, // 是否添加到喜欢
				songLyric: [], // 歌词数组
				lyricIndex: 0, // 歌词下标
			};
		},
		props: ['fixedButton'],
		watch: {
			// 监听底部tabbar详情是否展现，渲染音乐
			showDetail(newValue, oldValue) {
				if (newValue) {
					this.initMusic();
					this.sliderInterval();
				} else {
					this.clearTime();
				}
			}
		},
		created() {
			// 向父组件传递 初始化底部音乐tabbar的渲染 的方法，由父组件 onshow方法触发
			this.$emit('initMusicFiexdTab', this.initMusicFiexdTab);
		},
		mounted() {
			const LoopPlayback = uni.getStorageSync('LoopPlayback');
			if (LoopPlayback) {
				this.LoopPlayback = true;
			} else {
				this.LoopPlayback = false;
			}
		},
		methods: {
			// 初始化音乐播放数据
			initMusic() {
				console.log('初始化音乐')
				// 根据当前播放歌曲id获取下首歌曲
				this.$getNextMusic(this.songDetail.id);

				// 获取当前歌曲是否为喜欢
				this.LoveMusicStatus();

				// 已经创建播放器不在进行创建
				if (this.$bgAudioManager) {
					this.isPlayMusic = !this.$bgAudioManager.paused;
					// songLyric 获取歌词
					this.songLyric = uni.getStorageSync('lyric');
					console.log('获取到本地歌词')
					console.log(this.songLyric.length);
				} else {
					this.playMusic(this.songDetail.id);
				}
			},
			// 初始化底部音乐tabbar的渲染
			initMusicFiexdTab() {
				// 判断当前是否在播放音乐
				if (this.$bgAudioManager) {
					this.isPlayMusic = !this.$bgAudioManager.paused;
				}
				// 获取缓存音乐
				uni.getStorage({
					key: 'songDetail',
					success: (res) => {
						this.songDetail = res.data;
					}
				});
				// 播放下首歌曲方法
				Vue.prototype.$nextMusic = this.playMusic;
			},
			// 展示音乐tabbar详情
			handleShowDetail() {
				this.showDetail = true;
			},
			LoveMusicStatus() {
				// 初始化音乐详情，请求当前播放是否为喜欢歌曲
				const token = uni.getStorageSync('userToken');
				if (token) {
					const userId = Token.verify(token).data.id;
					this.playLoveMusic(userId, this.songDetail.id);
				}
			},
			UpMusic() {
				// 清除计时器
				this.clearTime();
				// 播放进度条清0
				this.value = 0;
				const UpMusicId = uni.getStorageSync('UpMusicId');
				this.playMusic(UpMusicId);
			},
			nextMusic() {
				// 清除计时器
				this.clearTime();
				// 播放进度条清0
				this.value = 0;
				const nextMusicId = uni.getStorageSync('nextMusicId');
				this.playMusic(nextMusicId);
			},
			// 接口获取数据 播放下首歌曲
			playMusic(songId) {
				// 根据当前播放歌曲id获取下首歌曲
				this.$getNextMusic(songId);
				this.lyricIndex = 0;
				
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
						
						// 获取当前歌曲是否为喜欢
						this.LoveMusicStatus();
					}
					this.isLoading = false;
				})
			},
			// 播放 暂停
			handlePlay() {
				if (this.$bgAudioManager) {
					if (this.$bgAudioManager.paused) {
						this.$bgAudioManager.play();
						this.isPlayMusic = true;
						this.iconPlay = 'icon-pause';
					} else {
						this.$bgAudioManager.pause();
						this.isPlayMusic = false;
						this.iconPlay = 'icon-bofang';
						this.clearTime();
					}
				} else {
					this.initMusic();
				}
			},
			// 手指接触进度条触发
			dragstart(){
				this.clearTime();
			},
			// 拖动进度条回调
			sliderChange(data) {
				this.value = data.value;
				if (this.$bgAudioManager) {
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
					this.sliderInterval();
				}
			},
			// 播放进度条 计时器
			sliderInterval() {
				if (this.$bgAudioManager && !this.$bgAudioManager.paused && this.showDetail) {
					console.log('展示音乐tabber && 播放');
					// 音乐总时长
					const duration = this.$bgAudioManager.duration;
					this.time = setInterval(() => {
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
					}, 500)

				} else {
					console.log('没展示音乐tabber');
				}
			},
			// 清除音乐播放条的定时器
			clearTime() {
				clearInterval(this.time)
			},
			// 处理资源相对路径问题
			urlReplace(url) {
				return url ? (this.baseImgUrl + url.replace(/\\/g, '/')) : ''
			},
			// 循环播放
			handleLoopPlayback() {
				this.LoopPlayback = !this.LoopPlayback;
				if (this.LoopPlayback) {
					uni.setStorageSync('LoopPlayback', true)
				} else {
					uni.removeStorageSync('LoopPlayback')
				}
			},
			// 播放音乐是否为喜欢
			playLoveMusic(userId, musicId) {
				const {
					playLoveMusic
				} = this.$api;
				playLoveMusic(userId, musicId).then(res => {
					this.isLoveMusic = res.isLove;
				})
			},
			// 添加喜欢
			loveMusic() {
				const token = uni.getStorageSync('userToken');
				if (token) {
					const {
						changeLoveMusic
					} = this.$api;
					const userId = Token.verify(token).data.id;
					// 修改当前播放歌曲喜欢状态
					changeLoveMusic(userId, this.songDetail.id).then(res => {
						if (res.success) {
							this.isLoveMusic = !this.isLoveMusic;
						}
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.playMusic {
		position: fixed;
		bottom: 0;
		height: 100rpx;
		width: 750rpx;
		transition: 0.3s;
		background-color: white;
		z-index: 100;

		.container {
			// #ifdef H5
			height: calc(100vh - 75px - 50px - 100rpx);
			// #endif
			// #ifdef  APP-PLUS  || MP-WEIXIN
			height: calc(100vh - 75px - 100rpx);
			// #endif
			scroll-view {
				height: 100% !important;
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

		// #ifdef H5
		.playMusicFixed {
			bottom: 50px !important;
		}
		// #endif
		.fixed-music {
			height: 100rpx;
			padding: 0 30rpx;
			width: 100%;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			border-top: solid 1rpx #eee;
			z-index: 1000000;

			.playMusic-img {
				background-color: black;
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				justify-content: space-around;
				align-items: center;

				image {
					width: 55rpx;
					height: 55rpx;
					border-radius: 50%;
					text-align: center;
					// css3关键帧动画
					animation: 10s linear move infinite;
					// 默认关闭动画
					animation-play-state: paused;
				}

				// 开始动画
				.play-run {
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
			}

			.playMusic-name {
				flex: 1
			}

			.playMusic-play_tabbar {
				transition: 0.5s;
				display: flex;
				justify-content: space-around;
				align-items: center;
				text {
					font-size: 55rpx;
					margin: 0 5rpx;
				}

				.loveMusic {
					color: #b84343;
				}
			}
		}

		.playMusic-content {
			position: absolute;
			left: 0;
			width: 100%;
			overflow: hidden;

			.playMusic-content-head {
				height: 75px;
				padding: 0 50rpx;
				line-height: 75px;
				text-align: center;
				position: relative;
				&>text:nth-child(1) {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 50rpx;
					margin: auto;
					font-size: 45rpx;
					transform: rotate(-90deg);
				}
				&>text:nth-child(2) {
					font-size: 35rpx;
					color: #eee;
				}
			}

			.play-music-detail {
				.detail-play {
					width: 550rpx;
					height: 550rpx;
					background: url(~@/static/disc.png);
					background-size: cover;
					margin: 190rpx auto 0;
					position: relative;
					z-index: 10;
					font-size: 100rpx;

					image {
						border-radius: 50%;
						width: 340rpx;
						height: 340rpx;
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
						width: 220rpx;
						height: 344rpx;
						background: url(../../static/needle.png);
						background-size: 100%;
						position: absolute;
						left: 100rpx;
						right: 0;
						top: -200rpx;
						margin: auto;
						background-size: cover;
						transition: 0.5s;
						transform-origin: 10rpx 20rpx;
					}

					text {
						font-size: 100rpx;
					}
				}
			}

			.playMusic-play {
				padding: 50rpx 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.loveMusic {
					color: #b84343;
				}

				text {
					font-size: 60rpx;
					margin: 0 35rpx;
				}

				text:nth-child(3) {
					font-size: 90rpx;
				}
			}
		}
	}
</style>
