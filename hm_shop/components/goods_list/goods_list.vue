<template>
	<view class="goods_List">
		<view class="goods_item" @click="navigator(item.id)" v-for="(item,index) in goods" :key="item.id">
			<image mode="widthFix" :src="item.img_url | randomImg"></image>
			<view class="price">
				<text>￥{{item.sell_price}}</text>
				<text>￥{{item.market_price}}</text>
			</view>
			<view class="name">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	import img1 from '@/static/image/1.png';
	import img2 from '@/static/image/2.png';
	import img3 from '@/static/image/3.png';
	import img4 from '@/static/image/4.png';
	import img5 from '@/static/image/5.png';
	import img6 from '@/static/image/6.png';
	export default{
		data(){
			return{
				
			}
		},
		props:{
			goods:{
				type: Array,
				default:[]
			}
		},
		filters:{
			randomImg(){
				const imgList =[img1,img2,img3,img4,img5,img6]
				return imgList[Math.floor(Math.random()*6)];
			}
		},
		methods:{
			navigator(id){
				this.$emit('goodsItemClick',id)
			}
		}
	}
</script>

<style lang="scss">
	.goods_List {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 15rpx;
		box-sizing: border-box;
	
		.goods_item {
			background-color: #fff;
			width: calc(705rpx / 2);
			margin-bottom: 15rpx;
	
			image {
				display: block;
				width: 100%;
				text-align: center;
				margin: auto;
			}
	
			.price {
				color: $show-color;
				font-size: 36rpx;
				margin: 20rpx 0 5rpx 0;
	
				text:nth-child(2) {
					font-size: 28rpx;
					color: #ccc;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}
	
			.name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}
</style>
