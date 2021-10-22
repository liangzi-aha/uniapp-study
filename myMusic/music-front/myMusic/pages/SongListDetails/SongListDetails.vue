<template>
	<view class="SongListDetails">
		<musichead title="歌单" :icon="true" color="black"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="list-music">
					<u-swipe-action bg-color="transparent" :show="item.show" :index="index" v-for="(item, index) in musicList" :key="item.id" @click="click(index,item.id)" @open="open" :options="options">
						<view class="list-music-item">
							<view class="list-music-content" @tap="handleToDetail(item.id)">
								<view class="list-music-top">
									{{index+1}}
								</view>
								<view class="list-music-song">
									<view>{{item.title}}</view>
									<view>
										<image mode="heightFix" src="../../static/dujia.png"></image>
										<image mode="heightFix" src="../../static/sq.png"></image>
										{{item.musicAuthor}} - {{item.musicName}}
									</view>
								</view>
								<text class="iconfont icon-bofang1"></text>
							</view>
						</view>
					</u-swipe-action>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				musicList: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				songId: ''
			}
		},
		onLoad(option) {
			const { songId } = option;
			this.songId = songId;
			this.renderSongListMusic(songId)
		},
		methods: {
			renderSongListMusic(songId){
				const { songListDetail } = this.$api;
				songListDetail(this.songId).then(res=>{
					if(res.success){
						let mapData = res.data.map(ele => {
							return {
								id: ele.id,
								title: ele.musicName,
								musicAuthor: ele.musicAuthor,
								show: false,
							}
						})
						this.musicList = mapData;
					}
				})
			},
			handleToDetail(songId) {
				uni.setStorageSync('trackIds',this.musicList);
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				})
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.musicList[index].show = true;
				this.musicList.map((val, idx) => {
					if (index != idx) this.musicList[idx].show = false;
				})
			},
			click(index,id) {
				const { delSongListMusic } = this.$api;
				delSongListMusic(this.songId,id).then(res=>{
					if(res.success){
						this.musicList[index].show = false;
						this.renderSongListMusic();
						uni.showToast({
							title: '删除成功'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.SongListDetails{
	height: 100vh;
	background-color: rgba(255,192,203,0.6); //darksalmon  khaki
	.container{
		// #ifdef H5
		height: calc(100vh - 75px);
		// #endif
	}
	.list-music {
		margin-top: 30rpx;
		.list-music-item {
			display: flex;
			height: 120rpx;
			margin: 0 32rpx 0 46rpx;
			color: #959595;
			align-items: center;
	
			.list-music-content {
				align-items: center;
				display: flex;
				width: 100%;
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
	
			&>text {
				font-size: 36rpx !important;
				margin-left: 20rpx;
			}
		}
	}
}
</style>
