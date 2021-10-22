<template>
	<view class="myPage">
		<view class="userInfo">
			<image v-if="login" src="../../static/head.jpg" mode=""></image>
			<text v-else class="iconfont icon-weidenglutouxiang1"></text>
			<view v-if="login" class="userInfo_box">
				<view class="userInfo_name">男孩亮亮</view>
				<view class="userInfo_vip">超级无敌至尊VIP</view>
			</view>
			<view v-else class="userInfo_box">
				<navigator url="../login/login">
					<view class="userInfo_name">未登录</view>
					<view class="userInfo_vip" style="background: #eeeeee;">黑铁VIP</view>
				</navigator>
			</view>
			<view class="youjiantou">
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="my_live" @click="handleToLoveMusic">
			<view class="my_live_img">
				<image :src="musicList.musicImg ? (baseImgUrl + musicList.musicImg).replace(/\\/g,'/') : noMusic" mode=""></image>
			</view>
			<view class="my_live_box">
				<view class="my_live_name">
					我喜欢的音乐
				</view>
				<view class="my_live_num">
					{{loveMusicNum}}首
				</view>
			</view>
		</view>
		<view class="nav">
			<view @click="handleToSongList()">
				<view>歌单</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<view @click="handleMessage()">
				<view>收藏音乐</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<view @click="handleMessage()">
				<view>播放记录</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="outLog" v-if="login">
			<button type="warn" @click="outLogin">退出登录</button>
		</view>
		
	</view>
</template>

<script>
	import Token from '../../utils/token.js';
	import noMusic from '../../static/noMusic.jpg';
	export default {
		data() {
			return {
				login: false,
				loveMusicNum: 0,
				musicList: {
					musicImg: false
				},
				baseImgUrl: this.$imgBaseUrl,
				noMusic: noMusic
			}
		},
		onLoad() {
			
		},
		onShow() {
			const token = uni.getStorageSync('userToken');
			if(token){
				this.login = true;
				this.getUserLoveMusic();
			}
		},
		methods: {
			getUserLoveMusic(){
				const {
					loveMusic
				} = this.$api;
				const {
					id
				} = Token.verify(uni.getStorageSync('userToken')).data;
				loveMusic(id).then(res => {
					if(res.success && res.data.length > 0){
						this.loveMusicNum = res.data.length;
						this.musicList = res.data[0];
						console.log(this.musicList)
					}
				});
			},
			handleMessage(){
				uni.showToast({
					title:"正在开发中",
					icon: 'none'
				})
			},
			handleToLoveMusic(){
				const token = uni.getStorageSync('userToken');
				if(token){
					uni.navigateTo({
						url: '../love_music/love_music'
					})
				} else{
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			handleToSongList(){
				const token = uni.getStorageSync('userToken');
				if(token){
					uni.navigateTo({
						url:'../song_list/song_list'
					})
				} else{
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			outLogin(){
				uni.removeStorageSync('userToken');
				this.login = false;
				this.musicList = {
					musicImg: false
				};
				this.loveMusicNum = 0;
				uni.showToast({
					title:"退出成功",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myPage {
		background-color: rgb(247, 247, 250);
		// #ifdef H5
		height: calc(100vh - 50px);
		// #endif
		// #ifdef MP-WEIXIN || APP-PLUS
		height: 100vh;
		// #endif
		overflow: hidden;

		.userInfo {
			padding: 0 70rpx;
			// #ifdef H5 || APP-PLUS
			margin-top: 80rpx;
			// #endif
			// #ifdef MP-WEIXIN
			margin-top: 70px;
			// #endif
			display: flex;
			align-items: center;
			&>text{
				font-size: 110rpx;
				border-radius: 50%;
				margin-right: 30rpx;
			}
			&>image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				margin-right: 30rpx;
			}

			.userInfo_box {
				flex: 1;

				.userInfo_name {
					font-weight: 600;
					font-size: 30rpx;
				}

				.userInfo_vip {
					display: inline-block;
					height: 40rpx;
					font-size: 20rpx;
					background-color: #ffe200;
					line-height: 40rpx;
					border-radius: 20rpx;
					padding: 0 20rpx;
					margin-top: 10rpx;
				}
			}

			.youjiantou {
				font-size: 25rpx;
			}
		}

		.my_live {
			margin: 40rpx 40rpx 0;
			padding: 20rpx 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			align-items: center;

			.my_live_img {
				margin-right: 25rpx;

				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 20rpx;
				}
			}

			.my_live_box {
				.my_live_name {
					font-size: 30rpx;
					line-height: 50rpx;
				}

				.my_live_num {
					font-size: 25rpx;
					color: #c3b7b7;
					line-height: 50rpx;
				}
			}
		}

		.nav {
			margin: 40rpx 40rpx 0;
			background-color: #fff;
			border-radius: 20rpx;
			padding: 20rpx 30rpx;
			&>view:nth-child(n+2){
				border-top: solid 2rpx #eeeeee;
			}
			&>view {
				font-size: 30rpx;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		.outLog{
			display: block;
			margin: 100rpx auto 0;
			button{
				width: 300rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 30rpx;
			}
		}
	}
</style>
