<template>
	<view class="search">
		<musichead title="搜索" :icon="true" :iconBlack="true"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont icon-search"></text>
					<input v-model="searchWord" @input="handleToSuggest" @confirm="handleToSearch(searchWord)" type="text"
						placeholder="搜索歌曲">
					<text v-show="searchType != 1" @tap="handleClose" class="iconfont icon-guanbi"></text>
				</view>
				<block v-if="searchType == 1">
					<view class="search-hidtory">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont icon-icon" @tap="handleClear"></text>
						</view>
						<view class="search-history-list">
							<view @tap="handleToWord(item)" v-for="(item,index) in searchHistory" :key="index">{{item}}
							</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">
							热搜榜
						</view>
						<view class="search-hot-item" @tap="handleToWord(item.musicName)"
							v-for="(item,index) in searchHot" :key="index">
							<view class="search-hot-top">
								{{index+1}}
							</view>
							<view class="search-hot-word">
								<view>
									{{item.musicName}}
									<image mode="aspectFit" src="../../static/hot.png"></image>
								</view>
								<view>{{item.musicAuthor}}</view>
							</view>
							<text class="search-hot-count">
								{{item.searchNum}}
							</text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 2">
					<view class="search-result">
						<view class="search-result-item" @tap="handleToDetail(item.id)" v-for="(item,index) in searchList" :key="index">
							<view class="search-result-word">
								<view>
									{{item.musicName}}
								</view>
								<view>
									{{item.musicName}} - {{item.musicAuthor}}
								</view>
							</view>
							<text class="iconfont icon-bofang1"></text>
						</view>
					</view>
				</block>
				<block v-else-if="searchType == 3">
					<view class="search-suggesr">
						<view class="search-suggesr-head">
							搜索“{{searchWord}}”
						</view>
						<view class="search-suggesr-item" @tap="handleToWord(item.musicName)" v-for="(item,index) in searchSuggest" :key="index">
							<text class="iconfont icon-search"></text>
							{{item.musicName + '-' +item.musicAuthor}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchHot: [],
				searchWord: '',
				searchHistory: [],
				searchType: 1,
				searchList:[],
				searchSuggest:[],
			}
		},
		onLoad() {
			this.musicHot();
			uni.getStorage({
				key: 'searchHistory',
				success: (res) => {
					this.searchHistory = res.data;
				}
			})
		},
		methods: {
			musicHot(){
				const {
					searchHot
				} = this.$api;
				searchHot().then(res => {
					this.searchHot = res.data;
					console.log(res.data);
				})
			},
			// 点击历史记录
			handleToWord(word) {
				this.searchWord = word;
				this.handleToSearch(word);
			},
			// 保存搜索记录并搜索内容
			handleToSearch(word) {
				this.searchHistory.unshift(word);
				// es6 new Set 去重
				this.searchHistory = [...new Set(this.searchHistory)];
				if (this.searchHistory.length > 10) {
					this.searchHistory.length = 10;
				}
				// 存入本地
				uni.setStorage({
					key: 'searchHistory',
					data: this.searchHistory
				})
				this.getSearchList(word);
			},
			// 清空搜索记录
			handleClear() {
				uni.removeStorage({
					key: 'searchHistory',
					success: (res) => {
						this.searchHistory = [];
					}
				});
			},
			getSearchList(word){
				const {
					searchMusic,
					searchNum
				} = this.$api;
				searchMusic(word).then(res=>{
					console.log(res);
					this.searchList = res.data;
					// 调用搜索记录加1
					searchNum(res.data[0].id).then(res=>{
						this.musicHot();
					})
					this.searchType = 2;
				})
			},
			handleClose(){
				this.searchWord = '';
				this.searchType = 1;
			},
			handleToDetail(songId){
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				})
			},
			handleToSuggest(ev){
				const {
					searchKey
				} = this.$api;
				let value = ev.detail.value;
				if(!value){
					this.searchType = 1;
					return;
				}
				searchKey(value).then(res=>{
					this.searchSuggest = res.data;
					this.searchType = 3;
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.search {
		.search-search {
			display: flex;
			align-items: center;
			height: 70rpx;
			margin: 30rpx 30rpx 50rpx 30rpx;
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

		.search-hidtory {
			margin: 0 30rpx 50rpx;
			font-size: 26rpx;

			.search-history-head {
				display: flex;
				justify-content: space-between;
				margin-bottom: 36rpx;
			}

			.search-history-list {
				display: flex;
				flex-wrap: wrap;

				view {
					padding: 16rpx 28rpx;
					border-radius: 40rpx;
					margin-right: 30rpx;
					margin-bottom: 30rpx;
					background-color: #f7f7f7;
				}
			}
		}

		.search-hot {
			margin: 0 30rpx;
			font-size: 26rpx;

			.search-hot-head {
				margin-bottom: 36rpx;
			}

			.search-hot-item {
				display: flex;
				align-items: center;
				margin-bottom: 58rpx;

				.search-hot-top {
					color: #fb2222;
					width: 60rpx;
					margin-left: 8rpx;
				}

				.search-hot-word {
					flex: 1;

					image {
						width: 48rpx;
						height: 22rpx;
					}

					view:nth-child(1) {
						font-size: 30rpx;
						color: black;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						color: #878787;
						width: 60vw;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.search-hot-count {
					color: #878787;
				}
			}

		}
		.search-result{
			border-top: 2rpx solid #e4e4e4;
			padding: 30rpx;
			.search-result-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 30rpx;
				margin-bottom: 30rpx;
				border-bottom: 2rpx solid #e4e4e4;
			}
			.search-result-word{
				view:nth-child(1){
					font-size: 28rpx;
					color: #235790;
					margin-bottom: 12rpx;
				}
				view:nth-child(2){
					font-size: 22rpx;
					color: #898989;
				}
			}
			text{
				font-size: 50rpx;
			}
		}
		.search-suggesr{
			border-top: 2rpx solid #e4e4e4;
			padding: 30rpx;
			font-size: 26rpx;
			.search-suggesr-head{
				color: #4574a5;
				margin-bottom: 74rpx;
			}
			.search-suggesr-item{
				color: #5d5d5d;
				margin-bottom: 74rpx;
				text{
					color: #bdbdbd;
					margin-right: 28rpx;
					position: relative;
					top: 2rpx;
				}
			}
		}
	}
</style>
