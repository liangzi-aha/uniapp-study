<template>
	<view class="goods_detail">
		<swiper :indicator-dots="true" :autoplay="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="swiper-item">
					<image mode="widthFix" :src="item.src | randomImg"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="box1">
			<view class="price">
				<text>￥{{info.sell_price}}</text>
				<text>￥{{info.stock_quantity}}</text>
			</view>
			<view class="goods_name">
				{{info.title}}
			</view>
		</view>
		<view class="line"></view>
		<view class="box2">
			<view>货号:{{info.goods_no}}</view>
			<view>库存:{{info.goods_quantity}}</view>
		</view>
		<view class="line"></view>
		<view class="box3">
			<view class="tit">详情介绍</view>
			<view class="content">
				<rich-text :nodes="content.content"> </rich-text>
			</view>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>

	</view>
</template>

<script>
	import hx1 from '@/heima_shop_server/src/public/images/hx1.jpg';
	import hx2 from '@/heima_shop_server/src/public/images/hx2.jpg';
	import hx3 from '@/heima_shop_server/src/public/images/hx3.jpg';
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'

	export default {
		components: {uniGoodsNav},
		data() {
			return {
				id: '',
				swiperList: [],
				info: {},
				content: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getSwiper();
			this.getGoodsDetail();
			this.getDetailContent();
		},
		filters: {
			randomImg() {
				const imgList = [hx1, hx2, hx3];
				return imgList[Math.floor(Math.random() * 3)]
			}
		},
		methods: {
			async getSwiper() {
				const {
					message
				} = await this.$request({
					url: '/api/getthumimages/' + this.id
				});
				this.swiperList = message;
			},
			async getGoodsDetail() {
				const res = await this.$request({
					url: '/api/goods/getinfo/' + this.id
				});

				this.info = res.message[0];
			},
			async getDetailContent() {
				const res = await this.$request({
					url: '/api/goods/getdesc/' + this.id
				});

				this.content = res.message[0];
				console.log(this.content)
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		swiper {
			// 480 * 320
			height: calc(750rpx / 480 * 320);

			.swiper-item {
				image {
					width: 750rpx;
				}
			}
		}

		.box1 {
			padding: 10rpx;

			.price {
				font-size: 35rpx;
				color: $show-color;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 30rpx;
				line-height: 60rpx;
			}
		}

		.line {
			height: 10rpx;
			width: 750rpx;
			background-color: #eee;
		}

		.box2 {
			padding: 10rpx;
			font-size: 32rpx;
			line-height: 60rpx;
		}

		.box3 {
			padding: 10rpx;
			border-bottom: 100rpx;
			.tit {
				font-size: 32rpx;
				border-bottom: solid 1rpx #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10rpx 0;
				font-size: 28rpx;
				color: #333;
				line-height: 50rpx;
			}
		}
		.goods_nav{
			position: fixed;
			bottom: 0;
			width: 100%;
			z-index: 1000;
		}
	}
</style>
