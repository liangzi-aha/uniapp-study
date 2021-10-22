<template>
	<view class="index">
		<musichead title="我爱听歌" :icon="false"></musichead>
		<view class="container">
			<view class="index-search" @tap="handleToSearch">
				<text class="iconfont icon-search"></text>
				<input type="text" placeholder="搜索歌曲">
			</view>
			<scroll-view class="index_scroll" scroll-y="true" :style="{ 'paddingBottom' : HistoryIsMusic ? '100rpx' : '' }">
				<view v-if="isLoading">
					<m-for-skeleton
					        :avatarSize="200"
					        :row="3"
					        :loading="isLoading"
					        :isarc="'square'"
					        v-for="(item,key) in 4"
							:titleStyle="{}"
							:title="false"
					        :key="key">
							
					        </m-for-skeleton>
				</view>
				<view class="index-list" v-else>
					<view class="index-list-item" v-for="item in topList" :key="item.id" @tap="handleToList(item.id)">
						<view class="index-list-img">
							<image :src="(baseImgUrl + item.music_classify_img).replace(/\\/g,'/')"></image>
							<text>{{item.music_classify_name}}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(item1,index) in item.music_classify_content" :key="index">{{ index + 1 }}、{{item1.musicName}} - {{item1.musicAuthor}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<music-tabbar v-if="HistoryIsMusic" :fixedButton="true" @initMusicFiexdTab="initMusicFiexdTab"></music-tabbar>
	</view>
</template>

<script>
	import mForSkeleton from "@/components/m-for-skeleton/m-for-skeleton";

	export default {
		components: {
			mForSkeleton
		},
		data() {
			return {
				topList:[],
				isLoading: true,
				initMusicFiexdTabCal: '',
				HistoryIsMusic: false,
				baseImgUrl: this.$imgBaseUrl
			}
		},
		onLoad() {
			this.renderHome();
		},
		onShow(){
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
		onPullDownRefresh() {
			this.renderHome(function(){
				uni.stopPullDownRefresh();
			})
		},
		methods: {
			renderHome(callback){
				this.$api.classifyList().then(res=>{
					let result = res.data;
					result.length > 4 ? result.length = 4 : '';
					if(result.length){
						this.topList = result;
					}
					this.isLoading = false;
					callback ? callback() : '';
				},err=>{
					callback ? callback() : '';
				});
			},
			handleToList(id){
				uni.navigateTo({
					url: '/pages/list/list?id=' + id
				})
			},
			handleToSearch(){
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			// 初始化音乐底部tabbar
			initMusicFiexdTab(callback){
				// 子组件传递的值保存父组件,并调用（子组件只传一次）
				if(callback){
					this.initMusicFiexdTabCal = callback;
					this.initMusicFiexdTabCal();
				}else if(this.initMusicFiexdTabCal){
					// 保存子组件方法后，进行调用
					this.initMusicFiexdTabCal();
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		.container{
			.index_scroll{
				// #ifdef MP-WEIXIN
				height: calc(100vh - 75px - 130rpx);
				// #endif
				// #ifdef H5
				height: calc(100vh - 125px - 130rpx);
				// #endif
			}
		}
		
		.index-search {
			display: flex;
			align-items: center;
			height: 70rpx;
			margin: 30rpx 30rpx 30rpx 30rpx;
			background-color: #f7f7f7;
			border-radius: 35rpx;
			text {
				font-size: 26rpx;
				margin-right: 26rpx;
				margin-left: 28rpx;
			}

			input {
				font-size: 28rpx;
				flex: 1;
			}
		}
		.index-list{
			margin: 0 30rpx;
			.index-list-item{
				display: flex;
				margin-bottom: 34rpx;
				.index-list-img{
					width: 212rpx;
					height: 212rpx;
					position: relative;
					border-radius: 30rpx;
					overflow: hidden;
					margin-right: 22rpx;
					image{
						width: 100%;
						height: 100%;
					}
					text{
						position: absolute;
						left: 12rpx;
						bottom: 16rpx;
						color: white;
						font-size: 25rpx;
						
					}
				}
				.index-list-text{
					flex:1;
					line-height: 66rpx;
					font-size: 26rpx;
					text-overflow :ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
					white-space :nowrap; /*让文字不换行*/
					overflow : hidden; /*超出要隐藏*/
				}
			}
		}
	}
</style>
