<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true" :style="{ 'paddingBottom' : HistoryIsMusic ? '100rpx' : '' }">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont icon-search"></text>
					<input type="text" placeholder="搜索歌曲">
				</view>
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
							<image :src="item.coverImgUrl"></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(item1,index) in item.tracks" :key="index">{{ index + 1 }}、{{item1.second}} - {{item1.second}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<music-tabbar v-if="HistoryIsMusic" @initMusicFiexdTab="initMusicFiexdTab"></music-tabbar>
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
			}
		},
		onLoad() {
			let listIds = ['3','0','2','1'];
			this.$api.topList().then(res=>{
				let result = res.list;
				result.length = 4;
				result.map((ele,index)=>{
					return ele.listId = listIds[index]
				});
				if(result.length){
					this.topList = result;
				}
				this.isLoading = false;
			});
		},
		onShow(){
			console.log('show')
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
