<template>
	<view>
		<view class="news_item" @click="navigater(item.id)" v-for="item in newsList" :key="item.id">
			<image mode="aspectFill" :src="item.img_url | randomImg"></image>
			<view class="right">
				<view class="tit">
					{{item.title}}
				</view>
				<view class="info">
					<text>发表时间:{{item.add_time | formatDate }}</text>
					<text>浏览次数:{{item.click}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hx1 from '@/heima_shop_server/src/public/images/hx1.jpg';
	import hx2 from '@/heima_shop_server/src/public/images/hx2.jpg';
	import hx3 from '@/heima_shop_server/src/public/images/hx3.jpg';
	export default{
		data(){
			return{
				
			}
		},
		filters:{
			formatDate(data){
				const newData = new Date(data);
				const year = newData.getFullYear();
				const month = (newData.getMonth() + 1).toString().padStart(2,0);
				const day = newData.getDay().toString().padStart(2,0);
				return year + '-' + month + '-' + day
			},
			randomImg(){
				const imgList = [hx1,hx2,hx3];
				return imgList[Math.floor(Math.random()*3)]
			}
		},
		props:{
			newsList:{
				type: Array,
				default: [],
			}
		},
		methods:{
			navigater(id){
				this.$emit('itemCilck',id)
			}
		}
	}
</script>

<style lang="scss">
	.news_item{
		display: flex;
		padding: 10rpx;
		border-bottom: 1rpx solid $show-color;
		image{
			flex: 2;
			height: 150rpx;
		}
		.right{
			margin-left: 15rpx;
			flex: 5;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.tit{
				font-size: 33rpx;
			}
			.info{
				font-size: 24rpx;
				text:nth-child(2){
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
