<template>
	<view class="goods_list">
		<goodList @goodsItemClick="goGoodsDetail" :goods="goods"></goodList>
		<view class="isOver" v-if="flag">-----我是有底线的-----</view>
	</view>
</template>

<script>
	import goodList from '@/components/goods_list/goods_list.vue'
	export default {
		components:{
			goodList
		},
		data() {
			return {
				pageIndex: 1,
				goods:[],
				flag: false,
			}
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.goods = [];
			this.flag = false;
			this.getHotGoods(()=>{
				uni.stopPullDownRefresh();
			});
		},
		onLoad(){
			this.getHotGoods();
		},
		methods: {
			// 获取热门商品列表数据
			async getHotGoods(callback) {
				let {
					message
				} = await this.$request({
					url: '/api/getGoods?pageindex=' + this.pageIndex,
				});
				callback && callback();
				this.goods = this.goods.concat(message);
			},
			// 跳转商品详情页面
			goGoodsDetail(id){
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			}
		},
		onReachBottom() {
			if(this.goods.length < this.pageIndex * 10) return this.flag = true
			this.pageIndex++;
			this.getHotGoods();
		}
	}
</script>

<style lang="scss">
	.goods_list{
		background-color: #eee;
		.isOver{
			color: #ccc;
			text-align: center;
			padding: 15rpx;
		}
	}
</style>
