<template>
	<view class="love_music">
		<musichead title="我的喜欢" :icon="true" color="white"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="love_music_head">
					<view class="love_music_img">
						<image mode="widthFix" :src="musicList.length > 0 ? (baseImgUrl + musicList[0].musicImg).replace(/\\/g,'/') : noMusic"></image>
					</view>
					<view class="love_music_box">
						<view class="love_music_title">我喜欢的音乐</view>
						<view class="love_music_name">
							<image src="../../static/head.jpg"></image>
							<text>男孩亮亮</text>
							<text class="iconfont icon-youjiantou"></text>
						</view>
					</view>
				</view>
				<view class="list-music">
					<view class="list-music-item" v-for="(item,index) in musicList" :key="index">
						<view class="list-music-content" @tap="handleToDetail(item.id)">
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
						<text class="iconfont icon-gengduo" @click="showSongList(item)"></text>
					</view>
				</view>
			</scroll-view>
			<u-popup v-model="show" border-radius="14" mode="bottom" :closeable="false">
				<view class="song_list">
					<view class="song_list_title">
						<view class="song_list_name">
							收藏到歌单
						</view>
						<view class="add_song_list" @click="()=>{showAddSongList = true}">
							<text class="iconfont icon-jiahao"></text>
							新建歌单
						</view>
					</view>
					<scroll-view scroll-y class="song_content">
						<view :index="index" v-for="(item, index) in list" :key="item.id" @click="AddToPlaylist(item.id)">
							<view class="song_content_box">
								<image :src="item.images" />
								<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
								<view class="title-wrap">
									<text class="title">{{ item.title }}</text>
									<view>{{ item.num }}首歌曲</view>
								</view>
								<text class="iconfont icon-youjiantou"></text>
							</view>
						</view>
					</scroll-view>
				</view>
			</u-popup>
			<!-- 新建歌单 -->
			<u-popup v-model="showAddSongList" mode="center" border-radius="20" :closeable="true">
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
	</view>
</template>

<script>
	import token from '../../utils/token.js';
	import iamge from '../../static/bgc.jpg';
	import noMusic from '../../static/noMusic.jpg';
	export default {
		data() {
			return {
				musicList: [],
				show: false,
				list: [],
				noMusic: noMusic,
				baseImgUrl: this.$imgBaseUrl,
				showAddSongList: false,
				songListName: '',
				editSongId: '',
			}
		},
		onLoad() {
			const {
				loveMusic
			} = this.$api;
			const { id } = token.verify(uni.getStorageSync('userToken')).data;
			loveMusic(id).then(res => {
				this.musicList = res.data;
			});
		},
		methods: {
			handleToDetail(songId) {
				uni.setStorageSync('trackIds',this.musicList);
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				})
			},
			showSongList(item) {
				this.show = true;
				this.renderSongList();
				this.editSongId = item.id;
			},
			renderSongList(){
				const {
					song_list
				} = this.$api;
				const { id } = token.verify(uni.getStorageSync('userToken')).data;
				
				song_list(id).then(res => {
					let mapData = res.data.map(ele => {
						return {
							id: ele.id,
							title: ele.songListName,
							num: ele.songListCon ? JSON.parse(ele.songListCon).length : 0,
							images: ele.songListCon && JSON.parse(ele.songListCon).length > 0 ? this.mapSongListImg(JSON.parse(ele.songListCon)[0],res.songListImg) : noMusic,
						}
					})
					this.list = mapData
				})
			},
			// 映射歌单图片
			mapSongListImg(musicId,musicList){
				const musicImg = musicList.filter(ele=>{
					return musicId == ele.id;
				});
				return (this.baseImgUrl + musicImg[0].musicImg).replace(/\\/g,'/');
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
						this.showAddSongList = false;
						uni.showToast({
							title: '添加成功'
						});
						this.renderSongList();
					}
				})
			},
			AddToPlaylist(id){
				const {addMusicToSongList} = this.$api;
				addMusicToSongList(this.editSongId,id).then(res=>{
					if(res.success){
						this.renderSongList();
						uni.showToast({
							title: res.message
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.love_music {
		height: 100vh;
		background-color: burlywood; //darksalmon  khaki
		.container{
			// #ifdef H5
			height: calc(100vh - 75px);
			// #endif
		}
		.love_music_head {
			height: calc(450rpx - 75px);
			display: flex;
			padding: 20rpx 30rpx;

			.love_music_img {
				width: 200rpx;
				height: 200rpx;
				overflow: hidden;

				&>image {
					width: 100%;
					border-radius: 30rpx;
				}
			}

			.love_music_box {
				margin-left: 20rpx;
				flex: 1;

				.love_music_title {
					font-size: 36rpx;
					color: white;
				}

				.love_music_name {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #eeeeee;
					margin-top: 16rpx;

					image {
						width: 54rpx;
						height: 54rpx;
						border-radius: 50%;
						margin-right: 16rpx;
					}

					&>text {
						margin-right: 16rpx;
					}
				}

			}
		}

		.list-music {
			margin-top: 30rpx;

			.list-music-item {
				display: flex;
				margin: 0 32rpx 50rpx 46rpx;
				color: #959595;
				align-items: center;

				.list-music-content {
					align-items: center;
					display: flex;

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

		.song_list {
			padding: 30rpx;

			.song_list_title {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.song_list_name {
					font-size: 35rpx;
					font-weight: 500;
				}

				.add_song_list {
					height: 66rpx;
					padding: 15rpx;
					border-radius: 30rpx;
					font-size: 28rpx;
					border: solid 2rpx #eee;

					text {
						font-size: 34rpx;
					}
				}
			}
			.song_content {
				max-height: 500rpx;
				.song_content_box {
					display: flex;
					width: calc(100vm - 40rpx);
					align-items: center;
					padding: 20rpx 0;
					image {
						width: 120rpx;
						flex: 0 0 120rpx;
						height: 120rpx;
						margin-right: 20rpx;
						border-radius: 12rpx;
					}
			
					.title-wrap {
						flex: 1;
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
