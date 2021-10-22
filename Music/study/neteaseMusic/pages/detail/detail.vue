<template>
	<view class="detail">
		<view class="fixbg" :style="{ 'background-image': 'url(' + songDetail.al.picUrl + ')' }"></view>
		<musichead :title="songDetail.name" :icon="true" color="white"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="detail-play" @tap="handlePlay">
					<image :class="{ 'detail-play-run' : isPlayMusic}" :src="songDetail.al.picUrl"></image>
					<text class="iconfont" :class="isPlayMusic ? 'icon-pause' : 'icon-bofang'"> </text>
					<view :class="{'pause-vidio' : !isPlayMusic}"></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap" :style="{'marginTop': -(lyricIndex-1) * 82 + 'rpx'}">
						<view class="detail-lyric-item" :class="{active : lyricIndex == index}" v-for="(item,index) in songLyric" :key="index">
							{{item.lyric}}
						</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">
						喜欢这首歌的人也听
					</view>
					<view class="detail-like-item" @tap="handleToSimi(item.id)" v-for="(item,index) in songSimi" :key="index">
						<view class="detail-like-img">
							<image :src="item.album.picUrl"></image>
						</view>
						<view class="detail-like-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70" mode="heightFix" src="../../static/dujia.png"></image>
								<image v-if="item.privilege.maxbr === 999000" mode="heightFix" src="../../static/sq.png"></image>
								{{item.album.artists[0].name}}-{{item.name}}
							</view>
						</view>
						<text class="iconfont icon-bofang1"></text>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">
						
					</view>
					<view class="detail-comment-item" v-for="(item,index) in songComment" :key="index">
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl"></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view>
										{{item.user.nickname}}
									</view>
									<view>{{ item.time | formatTime }}</view>
								</view>
								<view class="detail-comment-like">
									{{item.likedCount | formatCount}}
									<text class="iconfont icon-like"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				// 歌曲详情
				songDetail:{
					al:{
						picUrl:''
					}
				},
				// 推荐歌曲
				songSimi: [],
				// 评论
				songComment:[],
				// 歌词
				songLyric:[],
				// 歌词播放动画下标
				lyricIndex: 0,
				// 是否播放状态
				isPlayMusic: true,
				// 歌词定时器
				timer:'',
				// 接口是否加载完毕
				isLoading: true,
			}
		},
		onLoad(option) {
			this.getMusic(option.songId);
			// 播放下首歌曲方法放到原型上
			Vue.prototype.$nextMusic = this.getMusic;
		},
		onUnload(){
			this.cancelLyricIndex();
			// 关闭页面销毁播放器
			// #ifdef H5
			// this.$bgAudioManager.destroy();
			// #endif
		},
		// 页面隐藏关闭歌词定时器
		onHide() {
			this.cancelLyricIndex();
		},
		// 页面显示展示歌词定时器
		onShow() {
			this.listenLyricIndex();
		},
		methods: {
			// 获取歌曲详情 创建播放器
			getMusic(songId){
				// 获取下一首歌曲id
				this.$getNextMusic(songId);
				this.lyricIndex = 0;
				
				this.isLoading = true;
				const { songDetail,songSimi,songComment,songLyric,songUrl } = this.$api;
				Promise.all([ songDetail(songId),songSimi(songId),songComment(songId),songLyric(songId),songUrl(songId) ]).then(res=>{
					if(res[0].code == 200){
						this.songDetail = res[0].songs[0];
						uni.setStorage({
							key:'songDetail',
							data: res[0].songs[0]
						});
					}
					
					if(res[1].code == 200){
						this.songSimi = res[1].songs;
					}
					if(res[2].code == 200){
						this.songComment = res[2].hotComments;
					}
					if(res[3].code == 200){
						let lyric = res[3].lrc.lyric;
						// /[ :以"[ "开头 ():分组 [^\]]: 匹配除了 ] 之外的任意字符串
						let re = /\[([^\]]+)\]([^\[]+)/g;
						var result = [];
						lyric.replace(re,($0,$1,$2)=>{
							result.push({
								time: this.$formatTimeToSec($1),
								lyric: $2
							});
						});
						this.songLyric = result;
						
						// 保存歌词
						uni.setStorage({
							key:'songLyric',
							data: result
						});
					}
					if(res[4].code == 200){
						uni.setStorage({
							key:'songUrl',
							data: res[4].data[0].url
						})
						
						// 每次创建前判断是否有播放器，有销毁在创建
						// this.$bgAudioManager ? this.$bgAudioManager.destroy() : '';
						
						this.$CreateBgAudioManager(
							this.songDetail.name,
							this.listenLyricIndex,
							(status)=>{
								this.isPlayMusic = status;
							},
							res[4].data[0].url || '',
							this.songDetail.al.picUrl || '',
							this.cancelLyricIndex
						)
					}
					
					this.isLoading = false;
				})
			},
			// 暂停 播放
			handlePlay(){
				if(this.$bgAudioManager.paused){
					this.$bgAudioManager.play();
					this.listenLyricIndex();
				}else{
					this.$bgAudioManager.pause();
					this.cancelLyricIndex();
				}
			},
			// 歌词计时器
			listenLyricIndex(){
				clearInterval(this.timer);
				this.timer = setInterval(()=>{
					// 循环歌词
					for(var i = this.lyricIndex;i < this.songLyric.length;i++){
						// 当前播放时间大于 歌词的最后一个时间时
						if(this.$bgAudioManager.currentTime > this.songLyric[this.songLyric.length - 1]){
							this.lyricIndex = i;
							break;
						}
						// 当前歌曲播放时间大于第i个歌词的时间 且小于第i+1 个歌词时间 
						if(this.$bgAudioManager.currentTime > this.songLyric[i].time && this.$bgAudioManager.currentTime < this.songLyric[i+1].time){
							this.lyricIndex = i;
							break;
						}
					}
				},500)
			},
			// 清除歌词计时器
			cancelLyricIndex(){
				clearInterval(this.timer);
			},
			// 播放推荐歌曲
			handleToSimi(songId){
				// #ifdef H5
				this.$bgAudioManager.destroy();
				// #endif
				this.cancelLyricIndex();
				this.getMusic(songId);
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail {
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
			.detail-play-run{
				animation-play-state: running;
			}
			// 关键帧动画
			@keyframes move{
				from{
					transform: rotate(0deg);
				}
				to{
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
			
			.pause-vidio{
				transform:rotate(-20deg);
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
		.detail-lyric{
			font-size: 32rpx;
			line-height: 82rpx;
			height: 246rpx;
			text-align: center;
			overflow: hidden;
			color: #6f6e73;
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
		.detail-like{
			margin: 0 30rpx;
			.detail-like-head{
				font-size: 36rpx;
				color: #fff;	
				margin: 50rpx 0;
			}
			.detail-like-item{
				display: flex;
				align-items: center;
				margin-bottom: 28rpx;
				.detail-like-img{
					width: 82rpx;
					height: 82rpx;
					border-radius: 20rpx;
					overflow: hidden;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.detail-like-song{
					flex: 1;
					color: #c6c2bf;
					view:nth-child(1){
						font-size: 28rpx;
						color: white;
						margin-bottom: 12rpx;
					}
					view:nth-child(2){
						font-size: 22rpx;
					}
					image{
						height: 22rpx;
						margin-right: 10rpx;
					}
				}
				text{
					font-size: 50rpx;
					color: #c6c2bf;
				}
			}
		}
		.detail-comment{
			margin: 0 30rpx;
			.detail-comment-head{
				font-size: 36rpx;
				color: #fff;	
				margin: 50rpx 0;
			}
			.detail-comment-item{
				display: flex;
				margin-bottom: 28rpx;
				.detail-comment-img{
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.detail-comment-content{
					flex: 1;
					color: #cbcacf;
					.detail-comment-title{
						display: flex;
						justify-content: space-between;
						.detail-comment-name{
							view:nth-child(1){
								font-size: 26rpx;
							}
							view:nth-child(2){
								font-size: 20rpx;
							}
						}
						.detail-comment-like{
							font-size: 28rpx;
							text{
								margin-left: 8rpx;
							}
						}
					}
					.detail-comment-text{
						font-size: 28rpx;
						line-height: 40rpx;
						color: white;
						margin-top: 20rpx;
						border-bottom: 1rpx solid #e0e0e0;
						padding-bottom: 40rpx;
					}
				}
			}
		}
	}
</style>
s