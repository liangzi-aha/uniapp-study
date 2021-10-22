<template>
	<view class="home">
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swiperList" :key="item.id">
				<image mode="widthFix" :src="item.img"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区 -->
		<view class="nav">
			<view class="nav_item" v-for="item in navs" :key="item.id" @click="navItemClick(item.path)">
				<view>
					<i :class="item.icon"></i>
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class="tit">
				推荐商品
			</view>
			<goodsList @goodsItemClick="goGoodsDetail" :goods="goods"></goodsList>
		</view>
	</view>
	</view>
</template>

<script>
	import goodsList from '@/components/goods_list/goods_list.vue';
	export default {
		components:{
			goodsList
		},
		data() {
			return {
				swiperList: [],
				goods: [],
				navs: [{
					id: 1,
					icon: 'iconfont icon-ziyuan',
					title: '黑马超市',
					path: '/pages/goods/goods'
				}, {
					id: 2,
					icon: 'iconfont icon-guanyuwomen',
					title: '联系我们',
					path: '/pages/contact/contact'
				}, {
					id: 3,
					icon: 'iconfont icon-tupian',
					title: '社区图片',
					path: '/pages/pics/pics'
				}, {
					id: 4,
					icon: 'iconfont icon-shipin',
					title: '学习视频',
					path: '/pages/videos/videos'
				}, ]
			}
		},
		onLoad() {
			this.getSwiper();
			this.getHotGoods();
		},
		methods: {
			// 获取轮播图的数据
			async getSwiper() {
				let {
					message
				} = await this.$request({
					url: '/api/getlunbo'
				});

				this.swiperList = message;
				console.log(this.swiperList);
			},
			// 获取热门商品列表数据
			async getHotGoods() {
				let {
					message
				} = await this.$request({
					url: '/api/getGoods?pageindex=1'
				});
				this.goods = message;
				console.log(message);
			},
			// 导航点击的处理函数
			navItemClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 跳转商品详情页面
			goGoodsDetail(id){
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {

		// 750 * 410
		swiper {
			width: 750rpx;
			height: calc(750rpx / 750 * 410);

			image {
				width: 100vw;
			}
		}

		.nav {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 20rpx;

			.nav_item {
				height: 170rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				i {
					display: block;
					width: 110rpx;
					height: 110rpx;
					background-color: #b50e03;
					color: #b50e03;
					border-radius: 50%;
					text-align: center;
					line-height: 110rpx;
					color: white;
					font-size: 50rpx;
				}

				.icon-tupian {
					font-size: 45rpx;
				}

				text {
					font-size: 30rpx;
				}
			}
		}

		.hot_goods {
			background-color: #eee;
			overflow: hidden;
			margin-top: 20rpx;

			.tit {
				height: 50px;
				line-height: 50px;
				text-align: center;
				letter-spacing: 20px;
				background-color: white;
				margin: 7rpx 0;
				color: $show-color;
				// color: var(--themeColor);
			}

			
		}
	}
</style>
