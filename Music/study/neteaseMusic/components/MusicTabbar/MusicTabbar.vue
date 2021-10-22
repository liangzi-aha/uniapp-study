<template>
	<view class="playMusic" :style="{ 'height': showDetail ? '100%' : '0'}">
		<view class="fixed-music" @click="handleShowDetail()" :style="{ 'backgroundColor': showDetail ? '' : 'white' }">
			<view class="playMusic-img">
				<image mode="widthFix" :src="songDetail.al.picUrl" :class="{ 'play-run' : isPlayMusic}"></image>
			</view>
			<view class="playMusic-name">
				{{ songDetail.name }}
			</view>
			<view class="playMusic-play">
				<text class="iconfont icon-yduishangyiqu" @tap.stop="UpMusic()"></text>
				<text :class="isPlayMusic ? 'iconfont icon-pause' : 'iconfont icon-bofang'"
					@tap.stop="handlePlay()"></text>
				<text class="iconfont icon-yduixiayiqu" @tap.stop="nextMusic(songDetail.id)"></text>
			</view>
		</view>
		<view class="playMusic-content">
			<view class="playMusic-content-head" @tap="showDetail = false">
				<text class="iconfont icon-zuojiantou"></text>
			</view>
			<view class="play-music-detail" v-if="showDetail">
				<view class="fixbg" :style="{ 'background-image': 'url(' + songDetail.al.picUrl + ')' }"></view>
				<view class="detail-play" @tap="handlePlay">
					<image :class="{ 'detail-play-run' : isPlayMusic}" :src="songDetail.al.picUrl"></image>
					<text class="iconfont" :class="isPlayMusic ? 'icon-pause' : 'icon-bofang'"> </text>
					<view :class="{'pause-vidio' : !isPlayMusic}"></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap" :style="{'marginTop': -(lyricIndex-1) * 82 + 'rpx'}">
						<view class="detail-lyric-item" :class="{active : lyricIndex == index}"
							v-for="(item,index) in songLyric" :key="index">
							{{item.lyric}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: "playMusic",
		data() {
			return {
				showDetail: false,
				isPlayMusic: false,
				iconPlay: '',
				lyricIndex: 0,
				songLyric: '',
				songDetail: {
					al: {
						picUrl: ''
					}
				},
				timer: '',
				songUrl: '',
			};
		},
		watch: {
			// 监听底部tabbar详情是否展现，渲染音乐
			showDetail(newValue, oldValue) {
				if (newValue) {
					this.initMusic();
				} else{
					this.cancelLyricIndex();
				}
			}
		},
		created() {
			// 向父组件传递 初始化底部音乐tabbar的渲染 的方法，由父组件 onshow方法触发
			this.$emit('initMusicFiexdTab', this.initMusicFiexdTab);
		},
		beforeDestroy() {
			// 清除歌词定时器
			this.cancelLyricIndex();
		},
		methods: {
			initMusic() {
				uni.getStorage({
					key: 'songLyric',
					success: (res) => {
						this.songLyric = res.data;
					}
				});
				uni.getStorage({
					key: 'songUrl',
					success: (res) => {
						this.songUrl = res.data;
					}
				});

				// 根据当前播放歌曲id获取下首歌曲
				this.$getNextMusic(this.songDetail.id);

				// 已经创建播放器不在进行创建
				if (this.$bgAudioManager) {
					this.isPlayMusic = !this.$bgAudioManager.paused;
					!this.$bgAudioManager.paused ? this.listenLyricIndex() : '';
				} else {
					this.$CreateBgAudioManager(
						this.songDetail.name,
						this.listenLyricIndex,
						(status) => {
							this.isPlayMusic = status;
						},
						this.songUrl,
						this.songDetail.al.picUrl || '',
						this.cancelLyricIndex
					);
				}
			},
			handleShowDetail() {
				this.showDetail = true;
			},
			UpMusic(id) {
				const UpMusicId = uni.getStorageSync('UpMusicId');
				this.playMusic(UpMusicId);
			},
			nextMusic(id){
				const nextMusicId = uni.getStorageSync('nextMusicId');
				this.playMusic(nextMusicId);
			},
			// 接口获取数据 播放下首歌曲
			playMusic(nextId) {
				// 根据当前播放歌曲id获取下首歌曲
				this.$getNextMusic(nextId);
				this.lyricIndex = 0;
				
				const {
					songDetail,
					songLyric,
					songUrl
				} = this.$api;
				Promise.all([songDetail(nextId), songLyric(nextId), songUrl(nextId)]).then(res => {
					// 获取歌曲详情
					if (res[0].code == 200) {
						this.songDetail = res[0].songs[0];
						uni.setStorage({
							key: 'songDetail',
							data: res[0].songs[0]
						});
					}
					// 获取歌词
					if (res[1].code == 200) {
						let lyric = res[1].lrc.lyric;
						// /[ :以"[ "开头 ():分组 [^\]]: 匹配除了 ] 之外的任意字符串
						let re = /\[([^\]]+)\]([^\[]+)/g;
						var result = [];
						lyric.replace(re, ($0, $1, $2) => {
							result.push({
								time: this.$formatTimeToSec($1),
								lyric: $2
							});
						});
						this.songLyric = result;

						uni.setStorage({
							key: 'songLyric',
							data: result
						})
					}
					// 获取歌曲mp3地址
					if (res[2].code == 200) {
						uni.setStorage({
							key: 'songUrl',
							data: res[2].data[0].url
						})

						this.$CreateBgAudioManager(
							this.songDetail.name,
							this.listenLyricIndex,
							(res) => {
								this.isPlayMusic = res;
							},
							res[2].data[0].url || '',
							this.songDetail.al.picUrl || '',
							this.cancelLyricIndex
						)
					}
				})
			},
			handlePlay() {
				if (this.$bgAudioManager) {
					if (this.$bgAudioManager.paused) {
						this.$bgAudioManager.play();
						this.isPlayMusic = true;
						this.iconPlay = 'icon-pause';
						this.listenLyricIndex();
					} else {
						this.$bgAudioManager.pause();
						this.isPlayMusic = false;
						this.iconPlay = 'icon-bofang';
						this.cancelLyricIndex();
					}
				} else {
					this.initMusic();
				}
			},
			// 查找显示歌词
			listenLyricIndex() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					// 循环歌词
					for (var i = this.lyricIndex; i < this.songLyric.length; i++) {
						// 当前播放时间大于 歌词的最后一个时间时
						if (this.$bgAudioManager.currentTime > this.songLyric[this.songLyric.length - 1].time) {
							this.lyricIndex = i;
							clearInterval(this.timer);
							break;
						}
						// 当前歌曲播放时间大于第i个歌词的时间 且小于第i+1 个歌词时间 
						if (this.$bgAudioManager.currentTime > this.songLyric[i].time && this.$bgAudioManager.currentTime < this.songLyric[i + 1].time) {
							this.lyricIndex = i;
							break;
						}
					}
				}, 500)
			},
			// 取消定时器
			cancelLyricIndex() {
				clearInterval(this.timer);
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

			.playMusic-play {
				text {
					width: 55rpx;
					height: 55rpx;
					font-size: 55rpx;
					margin: 0 5rpx;
				}
			}
		}

		.playMusic-content {
			position: absolute;
			bottom: 100rpx;
			left: 0;
			width: 100%;
			height: calc(100% - 100rpx);
			overflow: hidden;

			.playMusic-content-head {
				padding: 55rpx 50rpx 10rpx;
				text {
					color: black;
					font-size: 45rpx;
					display: inline-block;
					transform: rotate(-90deg);
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
						transform: 0.5s;
						transform-origin: 10rpx 20rpx;
					}
				}

				.detail-lyric {
					font-size: 32rpx;
					line-height: 82rpx;
					height: 246rpx;
					text-align: center;
					overflow: hidden;
					color: #6f6e73;
					position: relative;
					z-index: 10;

					.detail-lyric-wrap {
						transform: 0.5s;

						.detail-lyric-item {
							height: 82rpx;
						}

						.active {
							color: white;
						}
					}
				}
			}
		}
	}
</style>
