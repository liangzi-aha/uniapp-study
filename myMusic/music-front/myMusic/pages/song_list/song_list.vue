<template>
	<view class="love_music">
		<musichead title="歌单" :icon="true" color="black"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="love_title">
					<view>{{ list.length }}张歌单</view>
					<view>
						<text class="iconfont icon-jiahao" @click="showAddSongList"></text>
					</view>
				</view>
				<u-swipe-action bg-color="transparent" :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id" @click="click(index,item.id)" @open="open" :options="options">
					<view class="item u-border-bottom" @click="goToDetail(item.id)">
						<image mode="aspectFill" :src="item.images" />
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap">
							<text class="title">{{ item.title }}</text>
							<view>{{ item.num }}首歌曲</view>
						</view>
						<text class="iconfont icon-youjiantou"></text>
					</view>
				</u-swipe-action>
			</scroll-view>
		</view>
		<u-popup v-model="show" mode="center" border-radius="20" :closeable="true">
			<view class="add_song">
				<view class="song_title">
					音乐歌单
				</view>
				<view class="song_name">
					<input v-model="songListName" type="text" placeholder="输入新建歌单标题">
				</view>
				<button type="default" @click="addSongList()">确定</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import token from '../../utils/token.js';
	import noMusic from '../../static/noMusic.jpg';
	export default {
		data() {
			return {
				list: [],
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				songListName: '',
				baseImgUrl: this.$imgBaseUrl
			}
		},
		onLoad() {
			this.renderSongList();
		},
		methods: {
			// 渲染歌单
			renderSongList() {
				const {
					id
				} = token.verify(uni.getStorageSync('userToken')).data;
				const {
					song_list
				} = this.$api;
				song_list(id).then(res => {
					let mapData = res.data.map(ele => {
						return {
							id: ele.id,
							title: ele.songListName,
							num: ele.songListCon ? JSON.parse(ele.songListCon).length : 0,
							images: ele.songListCon && JSON.parse(ele.songListCon).length > 0 ? this.mapSongListImg(JSON.parse(ele.songListCon)[0],res.songListImg) : noMusic,
							show: false,
						}
					})
					this.list = mapData;
					console.log(this.list)
				})
			},
			// 映射歌单图片
			mapSongListImg(musicId,musicList){
				const musicImg = musicList.filter(ele=>{
					return musicId == ele.id;
				});
				return (this.baseImgUrl + musicImg[0].musicImg).replace(/\\/g,'/');
			},
			// 跳转歌单详情页面
			goToDetail(id){
				uni.navigateTo({
					url:'../SongListDetails/SongListDetails?songId=' + id
				})
			},
			click(index,id) {
				const { delSongList } = this.$api;
				delSongList(id).then(res=>{
					if(res.success){
						this.list[index].show = false;
						this.renderSongList();
						uni.showToast({
							title: '删除成功'
						})
					}
				})
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			showAddSongList() {
				this.show = true;
			},
			addSongList() {
				const {
					id
				} = token.verify(uni.getStorageSync('userToken')).data;
				const {
					addSongList
				} = this.$api;
				addSongList(id, this.songListName).then(res => {
					if (res.success) {
						this.show = false;
						uni.showToast({
							title: '添加成功'
						});
						this.renderSongList();
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.love_music {
		height: 100vh;
		background-color: cornsilk; //darksalmon  khaki
		.container{
			// #ifdef H5
			height: calc(100vh - 75px);
			// #endif
		}
		.love_title {
			color: #999999;
			padding: 20rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				font-size: 34rpx;
			}
		}

		.item {
			display: flex;
			align-items: center;
			padding: 20rpx 30rpx;

			image {
				width: 120rpx;
				flex: 0 0 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				border-radius: 12rpx;
			}

			.title-wrap {
				flex: 1;
				height: auto;
				margin-left: 20rpx;

				.title {
					text-align: left;
					font-size: 32rpx;
					color: $u-content-color;
				}

				view {
					font-size: 25rpx;
					color: #999999;
					margin-top: 10rpx;
				}
			}
		}

		.add_song {
			padding: 30rpx 40rpx;

			.song_title {
				font-size: 36rpx;
				text-align: center;
				font-weight: 500;
			}

			.song_name {
				margin: 40rpx 0;

				input {
					border: solid 2rpx #eee;
					height: 80rpx;
					padding: 0 20rpx;
					text-indent: 0.5em;
				}
			}

			button {
				line-height: 80rpx;
				width: 100%;
				height: 80rpx;
				background-color: #f3627d;
				color: white;
			}
		}
	}
</style>
