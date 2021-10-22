<template>
	<view class="list">
		<view v-if="!isLoading" class="fixbg"
			:style="{ 'backgroundImage':'url('+ (baseImgUrl + playList.music_classify_img).replace(/\\/g,'/') +')' }">
		</view>
		<musichead title="歌单" :icon="true" color="white"></musichead>
		<view class="container" v-if="!isLoading">
			<scroll-view scroll-y="true" :style="{ 'paddingBottom' : HistoryIsMusic ? '100rpx' : '' }">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="(baseImgUrl + playList.music_classify_img).replace(/\\/g,'/')"></image>
						<text class="iconfont iconyousanjiao">{{playList.playCount | formatCount}}</text>
					</view>
					<view class="list-head-text">
						<view>{{playList.music_classify_name}}</view>
						<view>
							<image :src="(baseImgUrl + playList.music_classify_img).replace(/\\/g,'/')"></image>
							良子音乐
						</view>
						<view>
							{{playList.music_classify_name}}
						</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button class="list-share" open-type="share">
					<text class="iconfont iconicon-"></text>分享给微信好友
				</button>
				<!-- #endif -->
				<!-- 歌曲列表 -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-bofang"></text>
						<text>播放全部</text>
						<text>(共{{musicList.length}}首)</text>
					</view>
					<view class="list-music-item" v-for="(item,index) in musicList" :key="index" @tap="handleToDetail(item.id)">
						<view class="list-music-top">
							{{index+1}}
						</view>
						<view class="list-music-song">
							<view>{{item.musicName}}</view>
							<view>
								<image mode="heightFix" src="../../static/dujia.png"></image>
								<image mode="heightFix" src="../../static/sq.png"></image>
								{{item.musicAuthor}} - {{item.musicName}}
							</view>
						</view>
						<text class="iconfont icon-bofang1"></text>
					</view>
				</view>
			</scroll-view>
		</view>
		<music-tabbar v-if="HistoryIsMusic" @initMusicFiexdTab="initMusicFiexdTab"></music-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playList: {},  // 分类详情
				musicList: [], // 音乐列表
				isLoading: true,
				HistoryIsMusic: false, // 本地判断是否播放过music
				initMusicFiexdTabCal: '',
				baseImgUrl: this.$imgBaseUrl
			}
		},
		onLoad(option) {
			console.log(option.id);
			this.interfaceAll(option.id);
		},
		onShow() {
			this.initMusicFiexdTab();
			uni.getStorage({
				key:"songDetail",
				success: (res) => {
					if(res){
						this.HistoryIsMusic = true;
					}
				}
			})
		},
		methods: {
			handleToDetail(songId) {
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				})
			},
			// 初始化音乐底部tabbar
			initMusicFiexdTab(callback) {
				// 子组件传递的值保存父组件,并调用（子组件只传一次）
				if (callback) {
					this.initMusicFiexdTabCal = callback;
					this.initMusicFiexdTabCal();
				} else if (this.initMusicFiexdTabCal) {
					// 保存子组件方法后，进行调用
					this.initMusicFiexdTabCal();
				}
			},
			async interfaceAll(id) {
				let res = await this.$api.classifyMessage(id);
				this.playList = res.data[0];
				let res1 = await this.$api.classifyMusic(JSON.parse(res.data[0].music_classify_content));
				console.log(res1.data)
				this.musicList = res1.data;
				uni.setStorage({
					key: 'trackIds',
					data: res1.data
				});
				this.isLoading = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		.list-head {
			display: flex;
			margin: 30rpx;

		}

		.list-head-img {
			width: 264rpx;
			height: 264rpx;
			border-radius: 30rpx;
			overflow: hidden;
			position: relative;
			margin-right: 42rpx;

			image {
				width: 100%;
				height: 100%;
			}

			text {
				position: absolute;
				font-size: 26rpx;
				color: white;
				right: 8rpx;
				top: 8rpx;
			}
		}

		.list-head-text {
			flex: 1;
			color: #f0f2f7;

			view:nth-child(1) {
				color: white;
				font-size: 34rpx;
			}

			view:nth-child(2) {
				display: flex;
				margin: 20rpx 0;
				font-size: 24rpx;
				align-items: center;

				image {
					width: 54rpx;
					height: 54rpx;
					border-radius: 50%;
					margin-right: 14rpx;

				}
			}

			view:nth-child(3) {
				line-height: 34rpx;
				font-size: 22rpx;
			}
		}

		.list-share {
			width: 330rpx;
			height: 74rpx;
			margin: 0 auto;
			background-color: rgba(0, 0, 0, 0.4);
			border-radius: 37rpx;
			color: white;
			text-align: center;
			line-height: 74rpx;
			font-size: 28rpx;

			text {
				margin-right: 16rpx;
			}
		}

		.list-music {
			background-color: #fff;
			border-radius: 50rpx 50rpx 0 0;
			margin-top: 40rpx;
			overflow: hidden;

			.list-music-head {
				height: 50rpx;
				margin: 30rpx 0 70rpx 22rpx;

				text:nth-child(1) {
					font-size: 50rpx;
					height: 50rpx;
				}

				text:nth-child(2) {
					font-size: 30rpx;
					margin: 0 10rpx 0 26rpx;
				}

				text:nth-child(3) {
					font-size: 26rpx;
					color: #b2b2b2;
				}
			}

			.list-music-item {
				display: flex;
				margin: 0 32rpx 66rpx 46rpx;
				align-items: center;
				color: #959595;

				.list-music-top {
					width: 58rpx;
					font-size: 30rpx;
					line-height: 30rpx;
				}

				.list-music-song {
					flex: 1;

					view:nth-child(1) {
						width: 70vw;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 28rpx;
						color: black;
					}

					view:nth-child(2) {
						width: 70vw;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 20rpx;
						align-items: center;

						image {
							height: 20rpx;
							margin-right: 10rpx;
							vertical-align: middle;
						}
					}
				}

				text {
					font-size: 50rpx;
					color: c7c7c7;
				}
			}
		}
	}
</style>
